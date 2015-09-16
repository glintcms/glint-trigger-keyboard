/**
 * Module dependencies.
 */
var debug = require('debug')('glint-trigger-keyboard');
var Trigger = require('glint-trigger');
var key = require('keyboard-shortcut');
var merge = require('utils-merge');
var inherits = require('inherits');
var c = require('./config');

/**
 * Expose `Keyboard`
 */
exports = module.exports = Keyboard;
inherits(Keyboard, Trigger);

/**
 * `Keyboard` constructor function.
 */
function Keyboard(options) {
  if (!(this instanceof Keyboard)) return new Keyboard(options);
  Trigger.apply(this, arguments);

  this.c = this.c || {};
  merge(this.c, c);
  merge(this.c, options);
  this.init();
}

Keyboard.prototype.init = function () {
  var self = this, config = this.c, keys;

  // load, edit, cancel, save
  Object.keys(config.commands).forEach(function(cmd) {
    keys = config.commands[cmd];
    keys.forEach(function (short) {
      key(short, function (e) {
        e.preventDefault();
        debug(cmd);
        self.callFunction(cmd);
      });
    });
  });

};
