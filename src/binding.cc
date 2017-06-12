// binding.cc
#include <node.h>
#include <nan.h>

#include "binding.h"

// smc.h is written in C. In order to access the functions from C++, we need
// to tell the compiler not to mangle the function name.
//
// This is an error in their code and should eventually be fixed.
extern "C" {
  #include "smc.h"
}

namespace libsmc {

  using v8::Object;
  using v8::Local;

  // Checks whether the machine's optical disk drive (ODD) has a disk in it.
  // Returns a boolean.
  NAN_METHOD(IsOpticalDiskDriveFull) {
    bool status = is_optical_disk_drive_full();

    info.GetReturnValue().Set(status);
  }

  // Checks whether the machine is under battery power. Returns a boolean.
  NAN_METHOD(IsBatteryPowered) {
    bool status = is_battery_powered();

    info.GetReturnValue().Set(status);
  }

  // Initialize the module by exporting the methods.
  void Initialize(Local<Object> exports) {
    NAN_EXPORT(exports, IsOpticalDiskDriveFull);
    NAN_EXPORT(exports, IsBatteryPowered);
  }

  NODE_MODULE(libsmc, Initialize)

}
