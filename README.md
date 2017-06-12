# libsmc

> libsmc is a node.js binding to [libsmc](https://github.com/beltex/libsmc).
It retrieves info from the Apple System Management Controller API. The SMC
manages temperature and power within the machine.

## Usage

```javascript
const smc = require('libsmc');

// Return booleans.
smc.isBatteryPowered();
smc.isOpticalDiskDriveFull();
```

## API
Documentation coming soon.

## License
MIT license. beltex's libsmc is [licensed separately](./deps/libsmc/LICENSE).
