import adhan from 'adhan'
import config from './config'
import moment from 'moment'
import ntpClient from 'ntp-client'
import axios from 'axios'
// var performance = require('perf_hooks')

var params = config.calculationMethod
params.madhab = config.madhab

var ntpTimeDifference = 0

export async function syncTime() {

    var ntpTime = await axios.get('http://localhost:3001/getntptime')
    ntpTimeDifference = parseInt(moment(ntpTime.data).diff(moment()))
    console.log("NTP Time Difference:" + parseInt(ntpTimeDifference))
    return
}

export function getPrayerTimes() {
    var date = new Date((new Date()).getTime() + +ntpTimeDifference)
    var timeOffset = (-1) * (date.getTimezoneOffset() / 60)
    var prayerTimes = new adhan.PrayerTimes(config.coordinates, date, params)
    var formattedPrayerTimes = adhan.Date.formattedTime
    var currentTime = moment()

    var fajr = moment(formattedPrayerTimes(prayerTimes.fajr, timeOffset), "h:mm aa")
    if (config.fajrOffset > 0) {
        fajr.add(config.fajrOffset, 'minutes')
    }
    else {
        fajr.subtract(config.fajrOffset, 'minutes')
    }

    // var nextFajr = moment(formattedPrayerTimes(prayerTimes.fajr, timeOffset), "h:mm aa").add(1, 'days')
    var sunrise = moment(formattedPrayerTimes(prayerTimes.sunrise, timeOffset), "h:mm aa")
    var dhuhr = moment(formattedPrayerTimes(prayerTimes.dhuhr, timeOffset), "h:mm aa")
    var asr = moment(formattedPrayerTimes(prayerTimes.asr, timeOffset), "h:mm aa")
    var maghrib = moment(formattedPrayerTimes(prayerTimes.maghrib, timeOffset), "h:mm aa")
    if (config.fajrOffset > 0) {
        maghrib.add(config.maghribOffset, 'minutes')
    }
    else {
        maghrib.subtract(config.maghribOffset, 'minutes')
    }
    var isha = moment(formattedPrayerTimes(prayerTimes.isha, timeOffset), "h:mm aa")

    // console.log(moment(formattedPrayerTimes(prayerTimes.fajr, timeOffset)).format())
    var currentPrayer = ""
    var currentPrayerName = ""
    var nextPrayer = ""
    var nextPrayerName = ""
    if (currentTime.isBetween(fajr, sunrise)) {
        currentPrayer = fajr
        currentPrayerName = 'fajr'
        nextPrayer = sunrise
        nextPrayerName = 'sunrise'
    }
    else if (currentTime.isBetween(sunrise, dhuhr)) {
        currentPrayer = sunrise
        currentPrayerName = 'sunrise'
        nextPrayer = dhuhr
        nextPrayerName = 'dhuhr'
    }
    else if (currentTime.isBetween(dhuhr, asr)) {
        currentPrayer = dhuhr
        currentPrayerName = 'dhuhr'
        nextPrayer = asr
        nextPrayerName = 'asr'
    }
    else if (currentTime.isBetween(asr, maghrib)) {
        currentPrayer = asr
        currentPrayerName = 'asr'
        nextPrayer = maghrib
        nextPrayerName = 'maghrib'
    }
    else if (currentTime.isBetween(maghrib, isha)) {
        currentPrayer = maghrib
        currentPrayerName = 'maghrib'
        nextPrayer = isha
        nextPrayerName = 'isha'
    }
    else if (currentTime.isSameOrAfter(isha) || currentTime.isBefore(fajr)) {
        currentPrayer = isha
        currentPrayerName = 'isha'
        nextPrayer = fajr
        nextPrayerName = 'fajr'
    }

    return {
        'fajr': fajr,
        // 'nextFajr': nextFajr,
        'sunrise': sunrise,
        'dhuhr': dhuhr,
        'asr': asr,
        'maghrib': maghrib,
        'isha': isha,
        'currentPrayer': currentPrayer,
        'currentPrayerName': currentPrayerName,
        'nextPrayer': nextPrayer,
        'nextPrayerName': nextPrayerName
    }
}


// export default {getPrayerTimes, syncTime}