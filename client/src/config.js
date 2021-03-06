import zipcodes from 'zipcodes'
import adhan from 'adhan'


//Edit this section only
var zipcode = 77031
var madhab = adhan.Madhab.Hanafi
var calculationMethod = adhan.CalculationMethod.NorthAmerica()
var maghribOffset = 4; //minutes
var fajrOffset = -1; //minutes
//-----------------------





var latitude = parseInt(zipcodes.lookup(zipcode).latitude, 10)
var longitude = parseInt(zipcodes.lookup(zipcode).longitude, 10)
var coordinates = new adhan.Coordinates(latitude, longitude)



var config = {
    'latitude': latitude,
    'longitude': longitude,
    'coordinates': coordinates,
    'madhab': madhab,
    'calculationMethod': calculationMethod,
    'minutesToTurnRed': 20,
    'maghribOffset': maghribOffset, //minutes
    'fajrOffset': fajrOffset //minutes
}
console.log(config)

export default config