import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = {
  paper: {
    minHeight: '100px',
    padding: '40px',
    minWidth: '400px',
    margin: 'auto',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    position: 'absolute'
  },
  marginy: {
    margin: '10px 0'
  }
};

class UsernameForm extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit(this.state.username)
 }

 onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div>
        <div>
        <Paper style={styles.paper}>
          <h2>What is your username?</h2>
          <form onSubmit={this.onSubmit}>
            <TextField
              type="text"
              placeholder="Your fullname"
              fullWidth
              onChange={this.onChange}
              style={styles.marginy}
            />
            <Button color="primary" variant="contained" type="submit" style={styles.marginy}>submit</Button> 
          </form>
          </Paper>
        </div>
      </div>
    )
  }
}

 export default UsernameForm