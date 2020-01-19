
const fs = require('fs');

var allCountries = fs.readFileSync('all_countries.json')
const countries = JSON.parse(allCountries)
const france =  countries.features.filter( c => c.properties.CNTRY_NAME == 'France')
console.log('france', france)

fs.writeFileSync('france.json', JSON.stringify({'features': france, "type":"FeatureCollection"}), null, 4);


