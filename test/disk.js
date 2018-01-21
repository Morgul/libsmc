'use strict';

var test = require('tape');
var smc = require('../');

test('isOpticalDiskDriveFull()', function(t) {
    t.plan(1);

    // isOpticalDiskDriveFull returns a boolean
    var status = smc.isOpticalDiskDriveFull();
    t.ok(status === true || status === false, 'must return boolean');
});

test('isBatteryPowered()', function(t) {
    t.plan(1);

    // isBatteryPowered returns a boolean
    var status = smc.isBatteryPowered();
    t.ok(status === true || status === false, 'must return boolean');
});

test('getNumberOfFans()', function(t) {
    t.plan(3);

    // getNumberOfFans returns an integer
    var num = smc.getNumberOfFans();
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
    var num = smc.getNumberOfFans();
    if (num == 0)
        t.skip('no fans on machine');

    // Get the first fan and just test that.
    var info = smc.getFan(0);

    t.ok(typeof info === 'object');
    t.ok(typeof info.name === 'string');
    t.ok(typeof info.speed === 'number');
});

test('getTemp()', function(t) {
    t.plan(6);

    // Get the first CPU proximity value and just test that
    var info = smc.getTemp('TC0P');

    t.ok(typeof info === 'number');
    t.ok(info > 0);

    // Test units
    info = smc.getTemp('TC0P', 'F');

    t.ok(typeof info === 'number');
    t.ok(info > 0);

    info = smc.getTemp('TC0P', 'K');

    t.ok(typeof info === 'number');
    t.ok(info > 200);
});
