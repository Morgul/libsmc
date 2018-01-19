'use strict';

var binding = require('bindings')('smc');

// SMC needs to be opened and closed.
binding.Open();

process.on('exit', function() {
    binding.Close();
});

exports.isOpticalDiskDriveFull = function() {
    return binding.IsOpticalDiskDriveFull();
};

exports.isBatteryPowered = function() {
    return binding.IsBatteryPowered();
};

// Retrieve all information about a given fan.
exports.getFan = function(number) {
    if (typeof number !== 'number' || (number < 0))
        throw new Error('fan number must be a positive integer');

    var info = binding.GetFanInformation(number);

    // If it's falsy, then the binding bailed.
    if (!info)
        throw new Error('GetFanInformation failed (fan may not exist)');

    return info;
};

exports.getNumberOfFans = function() {
    return binding.GetFans();
};

exports.setFanMinRPM = function(fanNum, rpm, auth) {
    if (typeof fanNum !== 'number' || (fanNum < 0))
        throw new Error('fan number must be a positive integer');

    if (typeof rpm !== 'number' || (rpm <= 0))
        throw new Error('rpm must be a positive integer or 0');

    // Convert to a boolean
    auth = !!auth;

    return binding.SetFanMinRPM(fanNum, rpm, auth);
};