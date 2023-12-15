setTimeout(() => {
    console.log("Hello")
}, 100)

const logWorld = () => {
  console.log("World");
};

setTimeout(logWorld, 100)

const names = ['james', 'jess', 'lily', 'sevy'];

names.forEach((name) => console.log(name));

const myForEach = (arr, cb) => {
    for (let i = 0; i < arr.length; i++){
        const element = arr[i];
        cb(element);
    };
};

myForEach(names, (name) => {
    console.log(name);
})

const loadPokemon = (id, cb) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            cb(data)
        })
}

loadPokemon(56, (pokemon) => {
    console.log(pokemon)
});