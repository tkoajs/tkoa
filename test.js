import ava from 'ava';

let tKoa = require('./lib/application.js');
let app = new tKoa();

ava.pass('passed');
