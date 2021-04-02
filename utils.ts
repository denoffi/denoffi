
export function getLibPath(name: string, location = "."): string {
    let suffix = ".so";
    let prefix = "lib";
  
    if (Deno.build.os === "windows") {
      suffix = ".dll";
      prefix = "";
    }
  
    if (Deno.build.os === "darwin") {
      suffix = ".dylib";
    }
  
    return `${location}/target/debug/${prefix}${name}${suffix}`;
  }