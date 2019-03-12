import React, { Component } from 'react';
import axios from 'axios'
import ShowSeats from './components/ShowSeats/ShowSeats'
import Notification from './components/Notification/Notification'
import Form from './components/Form/Form';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seats: [],
      name: '',
      email: ''
    }
    this.seatSelect = this.seatSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const seats = await axios.get('/api/get-seats')
    this.setState({
      seats: [...seats.data]
    })
  }

  bookOrCancelAction = (resp, cancel=false) => {
    const { selected, seats } = this.state;
    if (resp.data.success) {
      let newSeats = seats;
      const index = seats.findIndex(seat => seat.id === selected);
      newSeats[index].booked = !newSeats[index].booked;
      const newSelected = cancel ? -1 : selected;
      const newBooked = newSelected > 0 ? true :false
      console.log(newSelected)
      this.setState({
        seats: newSeats,
        booked: newBooked,
        selected: newSelected,
        notification: resp.data.message
      })
    }
    else {
      this.setState({
        selected: -1,
        notification: resp.data.message
      })
    }
  }

  async seatSelect(seatId) {
    const { selected, booked } = this.state;
    if (selected > 0 && seatId !== selected) {
      return;
    }
    if (seatId === selected && booked) {
      const resp = await axios.post('/api/cancel', {
        id: seatId
      });
      this.bookOrCancelAction(resp,true)
    }
    else {
      this.setState({
        selected: seatId
      })
    }
  }

  validate = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const nameRegex = /^[a-zA-Z0-9 ]*$/
    const email = emailRegex.test(this.state.email);
    const name = nameRegex.test(this.state.name);
    return email && name;
  }

  onFormChange = (e) => this.setState({ [e.target.name]: e.target.value })

  async onSubmit(e) {
    e.preventDefault();
    const valid = this.validate();
    if (valid) {

      const resp = await axios.post('/api/book', {
        id: this.state.selected,
        name:this.state.name,
        email: this.state.email
      })
      this.bookOrCancelAction(resp)
    }
    else {
      this.setState({
        notification: 'Please enter valid details'
      })
    }
  }
  render() {
    const { email, selected, notification, seats, name, booked } = this.state;
    return (
      <div>
        <Notification message={notification} />
        <ShowSeats seats={seats} seatSelect={this.seatSelect} selected={selected} />
        {this.state.selected > 0 && !booked && <Form onChange={this.onFormChange} onSubmit={this.onSubmit} email={email} name={name} />}
      </div>
    );
  }
}

export default App;
