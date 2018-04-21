import React, { Component } from 'react'

export default class AdhaanPlayer extends Component {

    static getDerivedStateFromProps(nextProps, prevProps){
        if (prevProps.prayerTimes.currentPrayerName != nextProps.prayerTimes.currentPrayerName) {
            //play adhaan
        }
    }


    render() {
        return (
            {}
        )
    }


}
