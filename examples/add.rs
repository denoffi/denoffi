extern crate libc;

use libc::c_char;
use std::ffi::CStr;
use std::ffi::CString;
use std::iter;

/// Passing and returning integers
#[no_mangle]
pub extern "C" fn add(a: u32, b: u32) -> u32 {
  a + b
}

/// Rust functions with string arguments
///
/// In Rust, strings are composed of a slice of `u8` and are guaranteed to be valid UTF-8,
/// which allows for `NUL` bytes in the interior of the string.
///
/// In C, strings are just pointers to a `char` and are terminated by a `NUL`
/// byte (with the integer value `0`).
/// Some work is needed to convert between these two representations.
#[no_mangle]
pub extern "C" fn how_many_characters(s: *const c_char) -> u32 {
  let c_str = unsafe {
    assert!(!s.is_null());

    CStr::from_ptr(s)
  };

  let r_str = c_str.to_str().unwrap();
  r_str.chars().count() as u32
}

/// Rust functions that return allocated strings
#[no_mangle]
pub extern "C" fn theme_song_generate(length: u8) -> *mut c_char {
  let mut song = String::from("💣 ");
  song.extend(iter::repeat("na ").take(length as usize));
  song.push_str("Batman! 💣");

  let c_str_song = CString::new(song).unwrap();
  c_str_song.into_raw()
}

#[no_mangle]
pub extern "C" fn theme_song_free(s: *mut c_char) {
  unsafe {
    if s.is_null() {
      return;
    }
    CString::from_raw(s)
  };
}
