import React, { Component } from 'react'
import IndividualPrayerListItem from './InidividualPrayerListItem'
import { List } from 'material-ui';

export default class PrayerTimesList extends Component {
    render() {
        return (
            <List dense={true}>
                <IndividualPrayerListItem prayerTimes={this.props.prayerTimes} prayer="fajr"></IndividualPrayerListItem>
                {/*<Divider />*/}
                <IndividualPrayerListItem prayerTimes={this.props.prayerTimes} prayer="sunrise"></IndividualPrayerListItem>
                {/*<Divider />*/}
                <IndividualPrayerListItem prayerTimes={this.props.prayerTimes} prayer="dhuhr"></IndividualPrayerListItem>
                {/*<Divider />*/}
                <IndividualPrayerListItem prayerTimes={this.props.prayerTimes} prayer="asr"></IndividualPrayerListItem>
                {/*<Divider />*/}
                <IndividualPrayerListItem prayerTimes={this.props.prayerTimes} prayer="maghrib"></IndividualPrayerListItem>
                {/*<Divider />*/}
                <IndividualPrayerListItem prayerTimes={this.props.prayerTimes} prayer="isha"></IndividualPrayerListItem>
            </List>
        )
    }
}
