import React, { Component } from 'react'
import Sound from 'react-sound'
// var player = require('play-sound')()

export default class AdhaanPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playStatus: Sound.status.STOPPED,
            adhaanFileName: 'azan1.mp3',
            previousPrayerTimes: undefined
        }
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(prevState)
        var newState = {}
        if (prevState.previousPrayerTimes != undefined) {
            if (prevState.previousPrayerTimes.currentPrayerName != nextProps.prayerTimes.currentPrayerName) {
                newState = {
                    playStatus: Sound.status.PLAYING,
                    adhaanFileName: 'azan1.mp3',
                    previousPrayerTimes: nextProps.prayerTimes
                }
            }

        }
        else {
            newState = {
                playStatus: Sound.status.STOPPED,
                adhaanFileName: 'azan1.mp3',
                previousPrayerTimes: nextProps.prayerTimes
            }
        }
        return newState
    }

    handleSongFinishedPlaying() {
        this.setState({
            playStatus: Sound.status.STOPPED,
        })
    }


    render() {
        return (
            <Sound
                url={'/resources/adhaanFiles/' + this.state.adhaanFileName}
                playStatus={this.state.playStatus}
                onFinishedPlaying={this.handleSongFinishedPlaying}
            />
        )
    }


}
