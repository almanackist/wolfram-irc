#!/usr/bin/env node
var cfgPath = require('confortable')('.wa.json', process.cwd());
if (!cfgPath) {
  throw new Error("When loading wolfram-irc externally, a local config is required");
}
var cfg = require(cfgPath);

var ircStream = require('irc-stream')(cfg.server, cfg.name, cfg.irc, cfg.stream);
var gu = require('./').gu();
require('sulfur').absorb(gu.log, 'wolfbot');

ircStream.pipe(gu).pipe(ircStream);
