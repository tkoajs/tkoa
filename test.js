import test from 'ava';

let tKoa = require('./lib/application.js');

function newServer() {
    try {
        let app = new tKoa();
    } catch (e) {
        return 'fail';
    }
    return 'pass';
}

test('newServer testing', t => {
    t.is(newServer(), true);
});
