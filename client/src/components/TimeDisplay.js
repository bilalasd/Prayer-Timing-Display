import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import Typography from 'material-ui/Typography';


class TimeDisplay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Typography variant="display4">
                    {moment(this.props.currentTime).format("h:mm:ss a")}
                </Typography>
                <Typography variant="display3" gutterBottom>
                    {moment(this.props.currentTime).format("dddd, MMMM Do YYYY")}
                </Typography>
            </div>
        )
    }
}

export default TimeDisplay