'use strict';

const test = require('tape');
const smc = require('../');

test('optical disk drive', function(t) {
    t.plan(1);

    // isOpticalDiskDriveFull returns a boolean
    let status = smc.isOpticalDiskDriveFull();
    t.ok(status === true || status === false, 'must return boolean');
});

test('battery powered', function(t) {
    t.plan(1);

    // isBatteryPowered returns a boolean
    let status = smc.isBatteryPowered();
    t.ok(status === true || status === false, 'must return boolean');
});
