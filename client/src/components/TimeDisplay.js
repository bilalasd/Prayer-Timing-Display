import React from 'react'
import Typography from 'material-ui/Typography';


class TimeDisplay extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="display4">
                    {this.props.currentTime.format("h:mm:ss a")}
                </Typography>
                <Typography variant="display3">
                    {this.props.currentTime.format("dddd, MMMM Do YYYY")}
                </Typography>
            </div>
        )
    }
}

export default TimeDisplay