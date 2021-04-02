use libffi::low;
use std::ffi::NulError;
use std::fmt;

#[derive(Debug)]
pub enum Error {
  InvalidType(i32),
  LibFfiError(low::Error),
  CStringError(NulError),
  LibraryNotFound(String),
  FunctionNotFound { function: String, library: String },
  FunctionNotDefined(String),
}

impl fmt::Display for Error {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    match self {
      Error::InvalidType(number) => {
        write!(f, "Invalid type enum int: {}", number)
      }
      Error::LibFfiError(e) => write!(f, "Error from libffi: {:?}", e),
      Error::CStringError(e) => {
        write!(f, "Error when converting string to c string: {:?}", e)
      }
      Error::LibraryNotFound(library) => {
        write!(f, "Could not load library {}", library)
      }
      Error::FunctionNotFound { function, library } => write!(
        f,
        "Could not find function {} in library {}",
        function, library
      ),
      Error::FunctionNotDefined(function) => {
        write!(f, "Function {} not defined in function table", function)
      }
    }
  }
}

impl From<low::Error> for Error {
  fn from(error: low::Error) -> Self {
    Error::LibFfiError(error)
  }
}

impl From<NulError> for Error {
  fn from(error: NulError) -> Self {
    Error::CStringError(error)
  }
}

pub type Result<T> = std::result::Result<T, Error>;
