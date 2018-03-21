const geolite = require('geolite2');
const maxmind = require('maxmind');
const geodata = maxmind.openSync(geolite.paths.city);
const faker = require('faker');
const benchmark = require('benchmark');
const ips =  [];

for (let i = 0; i < 100000; i++) {
    ips.push(faker.internet.ip());
}

suite = new benchmark.Suite();

suite
  .add("maxmind.get()", function () {
    for (let ip of ips) {
        geodata.get(ip);
    }
  })
  // add listeners
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .run();


