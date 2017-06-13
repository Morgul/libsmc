'use strict';

const test = require('tape');
const smc = require('../');

test('isOpticalDiskDriveFull()', function(t) {
    t.plan(1);

    // isOpticalDiskDriveFull returns a boolean
    let status = smc.isOpticalDiskDriveFull();
    t.ok(status === true || status === false, 'must return boolean');
});

test('isBatteryPowered()', function(t) {
    t.plan(1);

    // isBatteryPowered returns a boolean
    let status = smc.isBatteryPowered();
    t.ok(status === true || status === false, 'must return boolean');
});

test('getNumberOfFans()', function(t) {
    t.plan(3);

    // getNumberOfFans returns an integer
    let num = smc.getNumberOfFans();
    t.ok(typeof num === 'number');

    if (num == 0)
        t.skip('no fans on machine');

    // smc.getFan(num) should fail
    t.throws(function() {
        smc.getFan(num);
    }, /failed/);

    // but smc.getFan(num - 1) should not fail
    t.doesNotThrow(function() {
        smc.getFan(num - 1);
    });
});

test('getFan()', function(t) {
    t.plan(3);

    // If there are no fans, skip.
    let num = smc.getNumberOfFans();
    if (num == 0)
        t.skip('no fans on machine');

    // Get the first fan and just test that.
    let info = smc.getFan(0);

    t.ok(typeof info === 'object');
    t.ok(typeof info.name === 'string');
    t.ok(typeof info.speed === 'number');
});
