//1. alloc
let buf = Buffer.alloc(10);
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>

//2. allocUnsafe
let buf_2 = Buffer.allocUnsafe(10000);
console.log(buf_2); // <Buffer 50 01 ef ef b2 01 00 00 90 a5 99 f1 b2 01 00 00 e0 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 11 05 00 04 00 00 05 00 50 08 f8 ef b2 01 00 00 00 00 ... 9950 more bytes>

//3. from
let buf_3 = Buffer.from('hello');
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_3); // <Buffer 68 65 6c 6c 6f>
console.log(buf_4); //<Buffer 69 6c 6f 76 65 79 6f 75>