var rn = (n)=>{return Math.floor(Math.random() * (n+1))} //return number
var rnft = (n1, n2)=>{return (n1>n2)? (rn(n1-n2) + n2): (rn(n2-n1) + n1)} //return number
var rp = (n)=>rn(100)<n; //return bool


var exports = {};

exports.randomNumber = exports.rn = rn;
exports.randomNumberFromTo = exports.rnft = rnft;
exports.randomPorcentage = exports.rp = rp;

module.exports = exports;