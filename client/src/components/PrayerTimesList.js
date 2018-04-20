import React, { Component } from 'react'
import IndividualPrayerListItem from './InidividualPrayerListItem'
import { List, ListItem, Divider } from 'material-ui';

export default class PrayerTimesList extends Component {
    render() {
        return (
            <List>
                <IndividualPrayerListItem prayer="fajr"></IndividualPrayerListItem>
                <Divider />
                <IndividualPrayerListItem prayer="sunrise"></IndividualPrayerListItem>
                <Divider />
                <IndividualPrayerListItem prayer="dhuhr"></IndividualPrayerListItem>
                <Divider />
                <IndividualPrayerListItem prayer="asr"></IndividualPrayerListItem>
                <Divider />
                <IndividualPrayerListItem prayer="maghrib"></IndividualPrayerListItem>
                <Divider />
                <IndividualPrayerListItem prayer="isha"></IndividualPrayerListItem>
            </List>
        )
    }
}
