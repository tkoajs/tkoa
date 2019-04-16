import test from 'ava';

let tKoa = require('./lib/application.js');

test('newServer testing', t => {
    t.is(() => {
        try {
            let app = new tKoa();
        } catch (e) {
            return false;
        }

        return true;
    }, true);
});
