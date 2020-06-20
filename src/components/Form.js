import React from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class ContactForm extends React.Component{
  
  constructor(props) {
	super(props);
	this.state = {
  	name: '',
  	email: '',
  	message: ''
	}
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST", 
      url:"http://localhost:3002/send", 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
        alert("Message Sent. Thank you"); 
        this.resetForm()
      }else if(response.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){
    
     this.setState({name: "", email: "", message: ""})
  }
  
  render() {
	return(
        <div className="form">
        <div className="form--title">
            <h1>Contact Form</h1>
        </div>

        <Form className="form--contact" onSubmit={this.handleSubmit.bind(this)} method="POST">

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="Enter your name"  
                    value={this.state.name} 
                    onChange={this.onNameChange.bind(this)} 
                />   
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter your email"  
                    value={this.state.mail} 
                    onChange={this.onEmailChange.bind(this)} 
                />   
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="3" 
                    placeholder="How can we help you ?"
                    value={this.state.message} 
                    onChange={this.onMessageChange.bind(this)} 
                />
            </Form.Group>
        

            
           
            <Button variant="primary" type="submit">
                Submit
            </Button>
      </Form>
        </div>
	);
  }

  onNameChange(event) {
	this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	this.setState({message: event.target.value})
  }
}

export default ContactForm;


/* <section id="section-contact" className="section-form"> 
      
      <div className="column form--container">
      <form className="form" id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">


      <div className="field form--field">
        <label className="label form--label" htmlFor="name">Your Name</label>
        <p className="control  has-icons-right">
          <input  
          type="text"
          className="input form--input"
          placeholder="Your name"
          value={this.state.name} onChange={this.onNameChange.bind(this)}
          />
          <span className="icon is-small is-right">
            <i className="fas fa-user"><FiUserCheck /></i>
          </span>
        </p>
      </div>

      <div className="field">
      <label className="label" htmlFor="name">Your Email</label>
      <p className="control  has-icons-right">
        <input  
        type="email"
          className="input form--input"
          placeholder="Your mail" 
          value={this.state.email} onChange={this.onEmailChange.bind(this)}
          />
        <span className="icon is-small is-right">
          <i><FiMail /></i>
        </span>
        </p>
      </div>
   
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea 
          className="textarea" 
          placeholder="How can I help you ?" 
          value={this.state.message} onChange={this.onMessageChange.bind(this)}></textarea>
        </div>
      </div>
    
     

      <button type="submit" className="btn btn--green btn--animated">Make Contact</button>
      </form>
      </div>
     
    </section> */