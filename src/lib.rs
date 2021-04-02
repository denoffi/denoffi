use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};
use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;
use dlopen::raw::Library;
// use dlopen::utils::platform_file_name;
use libffi::high as libffi;
use std::cell::RefCell;
use std::collections::HashMap;
use std::io;

// pub mod error;
// pub mod ffi;

thread_local! {
  static INDEX: RefCell<u8> = RefCell::new(1); // start from 1, Use 0 from error.
  static DLL_MAP: RefCell<HashMap<u8, Library>> = RefCell::new(HashMap::new());
}

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
  interface.register_op("op_ffi_dlopen", op_ffi_dlopen);
  interface.register_op("op_ffi_dlclose", op_ffi_dlclose);
  interface.register_op("op_ffi_call", op_ffi_call);
}

pub fn op_ffi_dlopen(_interface: &mut dyn Interface, zero_copy: &mut [ZeroCopyBuf]) -> Op {
  if zero_copy.is_empty() {
    println!("requied filename.");
    return Op::Sync(Box::new([0]));
  }

  let lib_file = zero_copy.get(0).unwrap();
  let lib_file = String::from_utf8_lossy(lib_file);
  // platform_file_name(lib_file.as_ref());
  let lib = Library::open(lib_file.as_ref()).unwrap();

  let mut id = 0;
  INDEX.with(|cell| {
    id = cell.replace_with(|&mut i| i + 1);
  });

  DLL_MAP.with(|cell| {
    cell.borrow_mut().insert(id, lib);
  });

  Op::Sync(Box::new(id.to_le_bytes()))
}

pub fn op_ffi_dlclose(_interface: &mut dyn Interface, zero_copy: &mut [ZeroCopyBuf]) -> Op {
  if zero_copy.is_empty() {
    println!("requied id.");
    return Op::Sync(Box::new([0]));
  }

  let zero_copy = zero_copy.get(0).unwrap();
  let id = zero_copy.get(0).unwrap();

  DLL_MAP.with(|cell| cell.borrow_mut().remove(id));

  Op::Sync(Box::new(id.to_le_bytes()))
}

pub fn op_ffi_call(_interface: &mut dyn Interface, zero_copy: &mut [ZeroCopyBuf]) -> Op {
  if zero_copy.is_empty() {
    let result = b"\0requied params.";
    let result_box: Box<[u8]> = Box::new(*result);
    return Op::Sync(result_box);
  }

  let zero_copy = zero_copy.get(0).unwrap();

  let mut rdr = io::Cursor::new(zero_copy.to_vec());

  let id = rdr.read_u8().unwrap();
  let num1 = rdr.read_u32::<LittleEndian>().unwrap();
  let num2 = rdr.read_u32::<LittleEndian>().unwrap();

  println!("num1={},num2={}", num1, num2);

  let num1 = libffi::call::arg(&num1);
  let num2 = libffi::call::arg(&num2);
    
  let result: Result<u32, String> = DLL_MAP.with(|cell| {
    let libs = cell.borrow();
    let lib = libs.get(&id).ok_or("Could not load library").unwrap();
    let fn_ptr = unsafe { lib.symbol("add") }.map_err(|err| err.to_string()).unwrap();
    let fn_code_ptr = libffi::CodePtr::from_ptr(fn_ptr);
    let ret = unsafe { libffi::call::<u32>(fn_code_ptr, &[num1, num2]) };
    println!("ret={}", ret);
    Ok(ret)
  });

  match result {
    Err(msg) => {
      let mut msg = msg.clone();
      println!("msg={}", msg);
      msg.insert(0, '\0');
      let result_box: Box<[u8]> = msg.into_bytes().into_boxed_slice();
      Op::Sync(result_box)
    }
    Ok(value) => {
      let mut wtr = vec![];
      wtr.write_u32::<LittleEndian>(value).unwrap();
      Op::Sync(wtr.into_boxed_slice())
    }
  }
}

pub fn get_dlopen_error_class(error: &dlopen::Error) -> &'static str {
  use dlopen::Error::*;
  match error {
    NullCharacter(_) => "InvalidData",
    OpeningLibraryError(ref e) => get_io_error_class(e),
    SymbolGettingError(ref e) => get_io_error_class(e),
    AddrNotMatchingDll(ref e) => get_io_error_class(e),
    NullSymbol => "NotFound",
  }
}

fn get_io_error_class(error: &io::Error) -> &'static str {
  use io::ErrorKind::*;
  match error.kind() {
    NotFound => "NotFound",
    PermissionDenied => "PermissionDenied",
    ConnectionRefused => "ConnectionRefused",
    ConnectionReset => "ConnectionReset",
    ConnectionAborted => "ConnectionAborted",
    NotConnected => "NotConnected",
    AddrInUse => "AddrInUse",
    AddrNotAvailable => "AddrNotAvailable",
    BrokenPipe => "BrokenPipe",
    AlreadyExists => "AlreadyExists",
    InvalidInput => "TypeError",
    InvalidData => "InvalidData",
    TimedOut => "TimedOut",
    Interrupted => "Interrupted",
    WriteZero => "WriteZero",
    UnexpectedEof => "UnexpectedEof",
    Other => "Error",
    WouldBlock => unreachable!(),
    // Non-exhaustive enum - might add new variants
    // in the future
    _ => unreachable!(),
  }
}
