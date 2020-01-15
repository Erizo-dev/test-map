'use strict';

const fs = require('fs');
const faker = require('faker')


const searched =  ['Paris', 'Lyon', 'Marseille', 'Brest', 'Toulouse', 'Lille']
let rawdata = fs.readFileSync('cities.json');

console.log('typeof()', typeof(rawdata.features))
let cities = JSON.parse(rawdata);

var mainCities = cities.features.filter( f => {
    return searched.includes(f.properties.nom) 
});

mainCities = mainCities.map( c => {return  {

...c,
properties: {
    ...c.properties,
    shopName: faker.company.companyName(),
    address: faker.address.streetAddress(true) + ' ' + faker.address.streetName()
}
}})

console.log('mainCities', mainCities)

fs.writeFileSync('mainCities.json', JSON.stringify({'features': mainCities}), null, 4);



// ]
// },
// "properties": {
//     "code": "29019",
//     "nom": "Brest"
// }
// },