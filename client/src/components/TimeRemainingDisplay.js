import React, { Component } from 'react'
import moment from 'moment'
import CircularProgressbar from 'react-circular-progressbar'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import momentDurationFormatSetup from 'moment-duration-format'
import tinygradient from 'tinygradient'
import config from '../config.js'

momentDurationFormatSetup(moment)
var gradient = tinygradient([
    { color: green[500], pos: 0 },
    { color: green[500], pos: 0.7 },
    { color: red[500], pos: 0.8 },
    { color: red[500], pos: 1 }
], )

class TimeRemainingDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nextPrayer: "",
            secondsFromCurrentPrayerToNext: "",
            secondsLeftUntilNextPrayer: "",
            fullTimeLeftUntilNextPrayer: "",
        }
        // this.getSecondsUntilNextPrayer = this.getSecondsUntilNextPrayer.bind(this)

    }

    static getSecondsUntilNextPrayer(props) {
        var secondsLeftUntilNextPrayer = 0

        if (props.prayerTimes.currentPrayerName == 'isha') {

            //check if the time is after isha and before midnight or after midnight and before fajr
            if (!props.currentTime.isBefore(props.prayerTimes['fajr'])) {
                //time is after isha but before midnight
                //to calculate correct secondsLeftUntilNextPrayer we will have to add seconds from currentTime
                //to midnight and seconds from midnight to the next day's fajr
                secondsLeftUntilNextPrayer += moment('23:59:59', 'HH:mm:ss').diff(props.currentTime, 'seconds')
                secondsLeftUntilNextPrayer += moment(props.prayerTimes.nextFajr).diff(moment('00:00:00', 'HH:mm:ss'), 'seconds')
            }
            else {
                //time is after midnight but before fajr
                secondsLeftUntilNextPrayer = props.prayerTimes.fajr.diff(props.currentTime, 'seconds')
            }
        }
        else {
            secondsLeftUntilNextPrayer = props.currentTime.diff(moment(props.nextPrayer), 'seconds')
        }
        return secondsLeftUntilNextPrayer
    }

    static getSecondsFromCurrentPrayerToNext(props) {
        var secondsFromCurrentPrayerToNext = 0

        if (props.prayerTimes.currentPrayerName == 'isha') {

            //check if the time is after isha and before midnight or after midnight and before fajr
            if (!props.currentTime.isBefore(props.prayerTimes['fajr'])) {
                //time is after isha but before midnight
                //to calculate correct secondsFromCurrentPrayerToNext we will have to add seconds from currentPrayer
                //to midnight and seconds from midnight to the next day's fajr
                secondsFromCurrentPrayerToNext += moment('23:59:59', 'HH:mm:ss').diff(props.currentPrayer, 'seconds')
                secondsFromCurrentPrayerToNext += moment(props.prayerTimes.nextFajr).diff(moment('00:00:00', 'HH:mm:ss'), 'seconds')
            }
            else {
                //time is after midnight but before fajr
                secondsFromCurrentPrayerToNext += moment('23:59:59', 'HH:mm:ss').diff(props.currentPrayer, 'seconds')
                secondsFromCurrentPrayerToNext += moment(props.prayerTimes.fajr).diff(moment('00:00:00', 'HH:mm:ss'), 'seconds')
            }
        }
        else {
            secondsFromCurrentPrayerToNext = props.currentTime.diff(moment(props.nextPrayer), 'seconds')
        }
        return secondsFromCurrentPrayerToNext
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        // console.log(nextProps)
        var secondsLeftUntilNextPrayer = TimeRemainingDisplay.getSecondsUntilNextPrayer(nextProps)

        var newState = {
            secondsFromCurrentPrayerToNext: TimeRemainingDisplay.getSecondsFromCurrentPrayerToNext(nextProps),
            secondsLeftUntilNextPrayer: secondsLeftUntilNextPrayer,
            fullTimeLeftUntilNextPrayer: moment.duration(secondsLeftUntilNextPrayer, 'seconds').format('[-]hh:mm:ss', {
                trim: false
            }),
        }
        // console.log(newState)
        gradient = tinygradient([
            { color: red[500], pos: 0 },
            { color: red[500], pos: (config.minutesToTurnRed * 60 / newState.secondsFromCurrentPrayerToNext) },
            { color: green[500], pos: (config.minutesToTurnRed * 60 / newState.secondsFromCurrentPrayerToNext) + 0.05 },
            { color: green[500], pos: 1 }
        ], )

        return newState
    }

    render() {
        return (
            <div style={{
                width: "100%",
                'marginLeft': "auto",
                'marginRight': "auto",
                'marginTop': "53px",
                'marginBottom': '53px'
            }}>
                <CircularProgressbar
                    percentage={(this.state.secondsLeftUntilNextPrayer / this.state.secondsFromCurrentPrayerToNext) * 100}
                    textForPercentage={(percentage) => {
                        return this.state.fullTimeLeftUntilNextPrayer
                    }}
                    styles={{
                        text: {
                            fill: gradient.rgbAt(this.state.secondsLeftUntilNextPrayer / this.state.secondsFromCurrentPrayerToNext),
                            //font: 'roboto',
                        },
                        path: { stroke: gradient.rgbAt(this.state.secondsLeftUntilNextPrayer / this.state.secondsFromCurrentPrayerToNext) }
                    }}
                />
            </div>
        )
    }
}

export default (TimeRemainingDisplay)