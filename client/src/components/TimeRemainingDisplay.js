import React, { Component } from 'react'
import moment from 'moment'
import CircularProgressbar from 'react-circular-progressbar'
import getPrayerTimes from '../api';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import momentDurationFormatSetup from 'moment-duration-format'
import tinygradient from 'tinygradient'

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
            max: "",
            secondsLeftUntilNextPrayer: "",
            fullTimeLeftUntilNextPrayer: "",
        }

    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        var prayerTimes = getPrayerTimes();
        var nextPrayer = prayerTimes['nextPrayer']
        var currentPrayer = prayerTimes['currentPrayer']
        var secondsLeftUntilNextPrayer = moment(nextPrayer, 'hh:mm a').diff(moment(nextProps.currentTime), 'seconds')
        var newState = {
            max: nextPrayer.diff(currentPrayer, 'seconds'),
            secondsLeftUntilNextPrayer: secondsLeftUntilNextPrayer,
            fullTimeLeftUntilNextPrayer: moment.duration(secondsLeftUntilNextPrayer, 'seconds').format('[-]hh:mm:ss', {
                trim: false
            }),
        }
        console.log((newState.max - newState.secondsLeftUntilNextPrayer) / newState.max)
        return newState
    }

    render() {
        return (
            <div style={{
                width: "60%",
                'marginLeft': "auto",
                'marginRight': "auto",
            }}>
                <CircularProgressbar
                    percentage={(this.state.secondsLeftUntilNextPrayer / this.state.max) * 100}
                    textForPercentage={(percentage) => {
                        return this.state.fullTimeLeftUntilNextPrayer
                    }}
                    styles={{
                        text: {
                            fill: gradient.rgbAt((this.state.max - this.state.secondsLeftUntilNextPrayer) / this.state.max),
                            font: 'roboto',
                        },
                        path: { stroke: gradient.rgbAt((this.state.max - this.state.secondsLeftUntilNextPrayer) / this.state.max) }
                    }}
                />
            </div>
        )
    }
}

export default (TimeRemainingDisplay)