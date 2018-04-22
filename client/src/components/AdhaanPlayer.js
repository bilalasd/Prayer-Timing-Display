import React, { Component } from 'react'
import Sound from 'react-sound'
import AdhaanDialog from './AdhaanDialog'

export default class AdhaanPlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playStatus: Sound.status.STOPPED,
            openDialog: false,
            adhaanFileName: 'azan1.mp3',
            previousPrayerTimes: undefined
        }
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        var newState = {}
        if (prevState.previousPrayerTimes != undefined) {
            if (prevState.previousPrayerTimes.currentPrayerName != nextProps.prayerTimes.currentPrayerName) {
                newState = {
                    playStatus: Sound.status.PLAYING,
                    openDialog: true,
                    adhaanFileName: 'azan' + ((Math.floor(Math.random()) * 21) + 1) + '.mp3',
                    previousPrayerTimes: nextProps.prayerTimes
                }
            }

        }
        else {
            newState = {
                playStatus: Sound.status.STOPPED,
                openDialog: false,
                previousPrayerTimes: nextProps.prayerTimes
            }
        }
        return newState
    }

    handleSongFinishedPlaying() {
        this.setState({
            playStatus: Sound.status.STOPPED,
            openDialog: false,
        })
    }

    handleDismiss() {
        this.setState({
            playStatus: Sound.status.STOPPED,
            openDialog: false,
        })
    }
    getPrayerDisplayName() {
        if (this.props.prayerTimes.currentPrayerName == 'fajr') {
            return "Fajr"
        }
        else if (this.props.prayerTimes.currentPrayerName == 'sunrise') {
            return "Sun Rise"
        }
        else if (this.props.prayerTimes.currentPrayerName == 'dhuhr') {
            return "Zuhr"
        }
        else if (this.props.prayerTimes.currentPrayerName == 'asr') {
            return "Asr"
        }
        else if (this.props.prayerTimes.currentPrayerName == 'maghrib') {
            return "Maghrib"
        }
        else if (this.props.prayerTimes.currentPrayerName == 'isha') {
            return "Isha"
        }
    }

    render() {
        return (
            <div>
                <Sound
                    url={'/resources/adhaanFiles/' + this.state.adhaanFileName}
                    playStatus={this.state.playStatus}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                />
                <AdhaanDialog handleDismiss={this.handleDismiss} openDialog={this.state.openDialog} title={this.getPrayerDisplayName()} />
            </div>
        )
    }


}
