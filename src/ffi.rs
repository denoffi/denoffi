use dlopen::raw::Library;
use libffi::middle;
use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use std::collections::HashMap;
use std::ffi::c_void;

use crate::error;

#[derive(FromPrimitive, Copy, Clone)]
pub enum FfiType {
  DOUBLE = 3,
  FLOAT = 2,
  LONGDOUBLE = 4,
  POINTER = 14,
  SINT16 = 8,
  SINT32 = 10,
  SINT64 = 12,
  SINT8 = 6,
  UINT16 = 7,
  UINT32 = 9,
  UINT64 = 11,
  UINT8 = 5,
  VOID = 0,
}

impl FfiType {
  fn to_libffi_type(&self) -> middle::Type {
    match *self {
      FfiType::DOUBLE => middle::Type::f64(),
      FfiType::FLOAT => middle::Type::f32(),
      FfiType::LONGDOUBLE => middle::Type::f64(),
      FfiType::POINTER => middle::Type::pointer(),
      FfiType::SINT16 => middle::Type::i16(),
      FfiType::SINT32 => middle::Type::i32(),
      FfiType::SINT64 => middle::Type::i64(),
      FfiType::SINT8 => middle::Type::i8(),
      FfiType::UINT16 => middle::Type::u16(),
      FfiType::UINT32 => middle::Type::u32(),
      FfiType::UINT64 => middle::Type::u64(),
      FfiType::UINT8 => middle::Type::u8(),
      FfiType::VOID => middle::Type::void(),
    }
  }
}

struct ForeignFn {
  cif: middle::Cif,
  n_args: usize,
  fn_ptr: middle::CodePtr,
  return_type: FfiType,
  arg_types: Vec<FfiType>,
}

impl ForeignFn {
  unsafe fn call<R>(&self, arguments: &[middle::Arg]) -> R {
    self.cif.call(self.fn_ptr, arguments)
  }
}

pub struct FnTable(HashMap<String, ForeignFn>);

impl FnTable {
  pub fn new() -> Self {
    FnTable(HashMap::new())
  }

  pub fn has_fn(&self, function: String) -> bool {
    self.0.contains_key(&function)
  }

  pub fn register_fn(
    &mut self,
    function: String,
    lib: &Library,
    return_type_int: i32,
    arg_type_ints: &[i32],
  ) -> error::Result<()> {
    if self.has_fn(function.clone()) {
      return Ok(());
    }

    let return_type = FfiType::from_i32(return_type_int)
      .ok_or(error::Error::InvalidType(return_type_int))?;
    let libffi_return_type = return_type.to_libffi_type();

    let mut arg_types: Vec<FfiType> = Vec::new();
    let mut libffi_arg_types: Vec<middle::Type> = Vec::new();

    for arg in arg_type_ints {
      let arg_type =
        FfiType::from_i32(*arg).ok_or(error::Error::InvalidType(*arg))?;
      arg_types.push(arg_type);
      libffi_arg_types.push(arg_type.to_libffi_type());
    }

    let cif =
      middle::Cif::new(libffi_arg_types.into_iter(), libffi_return_type);

    // let fn_ptr = unsafe { lib.symbol(function.as_str()) }.map_err(|err| err.to_string());
    let fn_ptr: *mut c_void = match unsafe { lib.symbol(function.as_str()) } {
      Ok(fn_ptr) => fn_ptr,
      Err(_) => {
        return Err(error::Error::FunctionNotDefined(function));
      }
    };

    self.0.insert(
      function,
      ForeignFn {
        cif: cif,
        fn_ptr: middle::CodePtr(fn_ptr),
        n_args: arg_types.len(),
        return_type: return_type,
        arg_types: arg_types,
      },
    );

    Ok(())
  }

  pub unsafe fn call_fn<R>(
    &self,
    function: String,
    arguments: &[middle::Arg],
  ) -> error::Result<R> {
    let foreign_fn = self
      .0
      .get(&function)
      .ok_or(error::Error::FunctionNotDefined(function))?;

    Ok(foreign_fn.call(arguments))
  }
}

// fn get_or_load_module(library_name: &str) -> error::Result<*mut c_void> {
//   let library_name_arg = CString::new(library_name)?.into_raw();

//   unsafe {
//     let mut module_handle = GetModuleHandleA(library_name_arg);

//     if module_handle.is_null() {
//       module_handle = LoadLibraryA(library_name_arg);

//       if module_handle.is_null() {
//         CString::from_raw(library_name_arg);
//         return Err(error::Error::LibraryNotFound(library_name.to_string()));
//       }
//     }

//     CString::from_raw(library_name_arg);
//     Ok(module_handle)
//   }
// }
