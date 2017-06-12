'use strict';

const binding = require('bindings')('smc');

exports.isOpticalDiskDriveFull = function() {
    return binding.IsOpticalDiskDriveFull();
};

exports.isBatteryPowered = function() {
    return binding.IsBatteryPowered();
};
