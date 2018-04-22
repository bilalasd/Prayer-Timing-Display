import React from 'react';
import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles';
import moment from 'moment'
import TimeDisplay from './TimeDisplay'
import TimeRemainingDisplay from './TimeRemainingDisplay'
// import { List, ListItem, Divider } from 'material-ui';
import getPrayerTimes from '../api';
import PrayerTimesList from './PrayerTimesList'
import AdhaanPlayer from './AdhaanPlayer'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: moment(),
      prayerTimes: getPrayerTimes()
    }

    this.updateTime = this.updateTime.bind(this)
  }

  updateTime() {
    this.setState({
      currentTime: moment(),
      prayerTimes: getPrayerTimes()
    })
  }

  componentDidMount() {
    setInterval(this.updateTime, 300)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AdhaanPlayer prayerTimes={this.state.prayerTimes} />
        <Grid container spacing={24}>
          <Grid item xs sm md lg>
            <Paper className={classes.paper}>
              <TimeDisplay currentTime={this.state.currentTime} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={5} sm={5} md={5} lg={5}>
            <Paper className={classes.paper}>
              <TimeRemainingDisplay prayerTimes={this.state.prayerTimes} currentTime={this.state.currentTime} />
            </Paper>
          </Grid>
          <Grid item xs sm md lg>
            <Paper className={classes.paper}>
              <PrayerTimesList prayerTimes={this.state.prayerTimes} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }


}

export default withStyles(styles)(App);
