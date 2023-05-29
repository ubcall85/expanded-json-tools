const mod = require('./index.js');

const cache = mod.readFromFile();

cache.then( (raw) => {

    let res = mod.search_table( 'user', {id: 1} )


    console.log(res[0].token);

    mod.update_table( 'user', {id: 1}, {token: 'ХУЙ'} )
} )