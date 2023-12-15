// Example 1
let myName = 'Kyle';

function printName() {
    console.log(myName)
};

myName = 'Joey';

printName(); // Joey

myName = 'Kate';

printName(); // Kate

// Example 2
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log('Outer Variable: ' + outerVariable);
        console.log('Inner Variable: ' + innerVariable);
    }
}

const newFunction = outerFunction('outside');
newFunction('inside')