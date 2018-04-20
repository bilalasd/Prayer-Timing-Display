import React, { Component } from 'react'
import { ListItem } from 'material-ui';
import { Grid } from 'material-ui';
import Typography from 'material-ui/Typography';
import getPrayerTimes from '../api'
import { withStyles } from 'material-ui';
import blue from 'material-ui/colors/blue';
// import blue200 from 'material-ui/styles';


const styles = {
    active: {
        background: blue[300],
    },
};

class IndividualPrayerListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            class: this.props.classes.inactive,
            prayerTimes: getPrayerTimes()
        }
        this.getPrayerTime = this.getPrayerTime.bind(this)
        setInterval(this.getPrayerTime, 100)

    }

    componentDidMount() {
        this.getPrayerTime()
    }

    getPrayerDisplayName() {
        if (this.props.prayer == 'fajr') {
            return "Fajr"
        }
        else if (this.props.prayer == 'sunrise') {
            return "Sun Rise"
        }
        else if (this.props.prayer == 'dhuhr') {
            return "Zuhr"
        }
        else if (this.props.prayer == 'asr') {
            return "Asr"
        }
        else if (this.props.prayer == 'maghrib') {
            return "Maghrib"
        }
        else if (this.props.prayer == 'isha') {
            return "Isha"
        }
    }

    getPrayerTime() {
        var prayerTimes = getPrayerTimes()
        if (prayerTimes.currentPrayerName == this.props.prayer) {
            this.setState({
                class: this.props.classes.active,
                prayerTimes: prayerTimes
            })
        }
        else {
            this.setState({
                class: this.props.classes.inactive,
                prayerTimes: prayerTimes
            })
        }
        return
    }

    render() {
        return (
            <div>
                <ListItem style={styles} className={this.state.class}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="display1">
                                {this.getPrayerDisplayName()}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="display1">
                                {this.state.prayerTimes[this.props.prayer].format('hh:mm a')}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </div>
        )
    }
}

export default withStyles(styles)(IndividualPrayerListItem)