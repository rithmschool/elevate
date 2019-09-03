import React from 'react';
import axios from 'axios'

class ForgotPassword extends React.Component {

  constructor(){
​    super()
​    this.state ={
​      email: '',
​      showError: false,
​      messageFromServer: ''
​    }
  }
  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }

  sendEmail(evt){
    evt.preventDefault();
    if(this.state.email === ''){
      this.setState({
        showError: false,
  ​      messageFromServer: ''
      });
    } else {
      axios.post('http://localhost:3001/forgotpassword', {
        email: this.state.email,
      })
      .then(response => {
        console.log(response.data);
        if(response.data === 'email not in db'){
          this.setState({
            showError: false,
  ​      messageFromServer: ''
          })
        }
      })
    }
  }
}
