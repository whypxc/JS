const a = 1;

function test () {
    const b = 2;
    console.log(a, b);
};

test(); /// 1, 2
console.log(a, b) // error, b is not defined
