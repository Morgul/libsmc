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

  // Open our connection with the smc.
  NAN_METHOD(Open) {
    kern_return_t ret = open_smc();
    if (ret == kIOReturnSuccess)
      return;

    // Throw an error complaining.
    Nan::ThrowError("failed to connect to smc");
  }

  // Close our connection with the smc.
  NAN_METHOD(Close) {
    kern_return_t ret = close_smc();
    if (ret == kIOReturnSuccess)
      return;

    // Throw an error complaining.
    Nan::ThrowError("failed to close the connection with the smc");
  }

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

  // Retrieves the number of fans in a machine. Returns an integer.
  NAN_METHOD(GetFans) {
    int fans = get_num_fans();

    info.GetReturnValue().Set(fans);
  }

  // Retrieves information about a given fan.
  NAN_METHOD(GetFanInformation) {
    // JS provides us with a fan number, but that might not be satisfactory.
    // Bail if it doesn't fit into an unsigned int type.
    Nan::Maybe<unsigned int> maybeNumber = Nan::To<unsigned int>(info[0]);
    if (maybeNumber.IsNothing())
      return;

    unsigned int number = maybeNumber.FromMaybe(0);

    // Retrieve the fan's name, a 12 letter string.
    fan_name_t name;
    bool success = get_fan_name(number, name);
    if (success == false)
      return;

    // Retrieve the fan's speed, in rotations per minute.
    unsigned int rpm = get_fan_rpm(number);
    if (rpm == 0)
      return;

    // Assemble the information into an object, and return that object.
    v8::Local<v8::Object> information = Nan::New<v8::Object>();

    Nan::Set(information, Nan::New("name").ToLocalChecked(),
             Nan::New(name).ToLocalChecked());
    Nan::Set(information, Nan::New("speed").ToLocalChecked(),
             Nan::New(rpm));

    info.GetReturnValue().Set(information);
  }

  // Sets the minimum RPM value for a fan
  NAN_METHOD(SetFanMinRPM)
  {
    // JS provides us with a fan number, but that might not be satisfactory.
    // Bail if it doesn't fit into an unsigned int type.
    Nan::Maybe<unsigned int> maybeFanNumber = Nan::To<unsigned int>(info[0]);
    if (maybeFanNumber.IsNothing())
      return;

    unsigned int fanNumber = maybeFanNumber.FromMaybe(0);

    // JS provides us with an rpm number, but that might not be satisfactory.
    // Bail if it doesn't fit into an unsigned int type.
    Nan::Maybe<unsigned int> maybeRPMNumber = Nan::To<unsigned int>(info[1]);
    if (maybeRPMNumber.IsNothing())
      return;

    unsigned int rpm = maybeRPMNumber.FromMaybe(0);

    // Get auth boolean
    Nan::Maybe<bool> maybeAuth = Nan::To<bool>(info[2]);
    bool auth = maybeAuth.FromMaybe(true);

    // Attempt to set the fan RPM
    bool success = set_fan_min_rpm(fanNumber, rpm, auth);

    // Return whether or not it worked.
    info.GetReturnValue().Set(success);
  }

  // Initialize the module by exporting the methods.
  void Initialize(v8::Local<v8::Object> exports) {
    NAN_EXPORT(exports, Open);
    NAN_EXPORT(exports, Close);

    NAN_EXPORT(exports, IsOpticalDiskDriveFull);
    NAN_EXPORT(exports, IsBatteryPowered);

    NAN_EXPORT(exports, GetFans);
    NAN_EXPORT(exports, GetFanInformation);
    NAN_EXPORT(exports, SetFanMinRPM);
  }

  NODE_MODULE(libsmc, Initialize)

}
