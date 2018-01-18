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

exports.getTemp = function(tempKey) {
    if (!tempKey)
        throw new Error('Must pass a valid temperature key to read');

    var info = binding.GetTemp(tempKey);

    return info || 0;
};
