import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography';



export default class AdhaanPlayer extends Component {


  render() {
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.handleDismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="display4">
              {this.props.title}
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.props.handleDismiss} color="primary">
              Disagree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}