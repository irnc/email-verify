let debug = false;

const log = function (level, msg) {
  if (debug) {
    console.log(`${level}: ${msg}`);
  }
};

const logArray = function (level, array) {
  if (debug) {
    for (let i = 0; i < array.length; i++) {
      console.log(`${level}: ${array[i]}`);
    }
  }
};

module.exports.logger = {
  info(msg) {
    log('INFO', msg);
  },
  error(msg) {
    log('ERROR', msg);
  },
  server(msg) {
    logArray('SERVER', msg.split('\n'));
  },
  client(msg) {
    logArray('CLIENT', msg.split('\n'));
  },
};

module.exports.loggerOptions = {
  enable() {
    debug = true;
  },
  disable() {
    debug = false;
  },
};
