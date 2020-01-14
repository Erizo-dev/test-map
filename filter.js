'use strict';

const fs = require('fs');


const searched =  ['Paris', 'Lyon', 'Marseille', 'Brest', 'Toulouse', 'Lille']
let rawdata = fs.readFileSync('cities.json');

console.log('typeof()', typeof(rawdata.features))
let cities = JSON.parse(rawdata);

var mainCities = cities.features.filter( f => {
    return searched.includes(f.properties.nom) 
});

console.log('mainCities', mainCities)

fs.writeFileSync('mainCities', JSON.stringify({'features': mainCities}), null, 4);



