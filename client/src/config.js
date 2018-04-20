import zipcodes from 'zipcodes'
import adhan from 'adhan'


//Edit this section only
var zipcode = 77031
var madhab = adhan.Madhab.Hanafi
var calculationMethod = adhan.CalculationMethod.NorthAmerica()
//-----------------------




var latitude = parseInt(zipcodes.lookup(zipcode).latitude)
var longitude = parseInt(zipcodes.lookup(zipcode).longitude)
var coordinates = new adhan.Coordinates(latitude, longitude)



var config = {
    'latitude': latitude,
    'longitude': longitude,
    'coordinates': coordinates,
    'madhab': madhab,
    'calculationMethod': calculationMethod,
    'minutesToTurnRed': 20,
}
console.log(config)

export default config