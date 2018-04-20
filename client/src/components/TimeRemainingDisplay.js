import React, { Component } from 'react'
import moment from 'moment'
import { CircularProgress } from 'material-ui/Progress'
import getPrayerTimes from '../api';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import momentDurationFormatSetup from 'moment-duration-format'
import tinygradient from 'tinygradient'

momentDurationFormatSetup(moment)
var gradient = tinygradient([
    { color: green[500], pos: 0 },
    { color: green[500], pos: 0.9 },
    { color: red[500], pos: 1 }
], )

export default class TimeRemainingDispla extends Component {
    constructor(props) {
        super(props)
        this.updateTime = this.updateTime.bind(this)
        setInterval(this.updateTime, 50)
        var nextPrayer = getPrayerTimes()['nextPrayer']
        var currentPrayer = getPrayerTimes()['currentPrayer']
        this.state = {
            nextPrayer: nextPrayer,
            max: nextPrayer.diff(currentPrayer, 'seconds'),
            secondsLeft: moment(this.props.nextPrayer, 'hh:mm a').diff(moment(this.props.currentTime)),
            timeLeft: 0,
        }

    }

    updateTime() {
        var secondsLeft = (this.state.nextPrayer.diff(moment(this.props.currentTime), 'seconds'))
        this.setState({
            secondsLeft: secondsLeft,
            timeLeft: moment.duration(secondsLeft, 'seconds').format('-h:mm:ss'),
            color: gradient.rgbAt(1 - (secondsLeft / this.state.max))
        })
    }

    render() {
        return (
            <div>
                <Typography
                    variant="display3"
                    style={{
                        color: this.state.color,
                        position: "absolute",
                        top: '48%',
                        left: '18%'
                    }}>
                    {this.state.timeLeft}
                </Typography>
                <CircularProgress
                    variant="determinate"
                    size={400}
                    style={{
                        color: this.state.color,
                        zIndex: 1
                    }}
                    value={this.state.secondsLeft}
                    min={0}
                    max={this.state.max}
                />
            </div>
        )
    }
}
