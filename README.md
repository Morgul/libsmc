# libsmc

[![Build Status](https://travis-ci.org/brendanashworth/libsmc.svg?branch=master)](https://travis-ci.org/brendanashworth/libsmc)
[![NPM version](https://badge.fury.io/js/libsmc.svg)](http://badge.fury.io/js/libsmc)

> libsmc is a node.js binding to [libsmc](https://github.com/beltex/libsmc).
It retrieves info from the Apple System Management Controller API. The SMC
manages temperature and power within the machine.

## API

### `smc.isBatteryPowered()`
Checks whether or not the machine is running on battery power. Returns a
`bool` value.

```javascript
var smc = require('libsmc');

var usingBattery = smc.isBatteryPowered();
// => false
```

### `smc.isOpticalDiskDriveFull()`
Checks whether or not the optical disk drive (ODD) of the machine has a disk
in it. Returns a `bool` value.

```javascript
var smc = require('libsmc');

var hasDisk = smc.isOpticalDiskDriveFull();
// => true
```

### `smc.getNumberOfFans()`
Gets the number of fans a machine has. Returns an `int` value.

```javascript
var smc = require('libsmc');

var number = smc.getNumberOfFans();
// => 2
```

### `smc.getFan(number)`
Gets the information related to a specific fan. `number` is a positive integer
unique to that fan, starting at 0. Returns an object of format
`{ name, speed }`, where `name` is the given name from the machine, and `speed`
is the RPM (rotations per minute) of the fan at that point in time.

```javascript
var smc = require('libsmc');

var fan = smc.getFan(0);
// => { name: 'ExhaustZ', speed: 2176 }
```

### `smc.getTemp(sensor, units)`
Gets the temperature value related to a specific sensor. `sensor` is a valid SMC
sensor name (ex: `'TC0P'`). `units` is the string `'celsius'`, `'fahrenheit'`, or
`'kelvin'` (case insensitive). Defaults to `'celsius'`. Returns a floating point
number that is in the units specified.

```javascript
var smc = require('libsmc');

var fan = smc.getTemp('TC0P', 'kelvin');
// => 315.15
```

## License
MIT license. beltex's libsmc is [licensed separately](./deps/libsmc/LICENSE).
