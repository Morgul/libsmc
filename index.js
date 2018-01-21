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

exports.getTemp = function(tempKey, units) {
    if (typeof tempKey !== 'string')
        throw new Error('Must pass a valid temperature key to read');

    if (units && typeof units !== 'string')
        throw new Error('Must pass a valid string for units');

    var types = { 'C': 0, 'F': 1, 'K': 2 };
    var selection = types[units && units.toUpperCase()] || 0;

    return binding.GetTemp(tempKey, selection);
};
