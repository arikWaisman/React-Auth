import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/';

class Signup extends Component {

	handleFormSubmit(formValues){
		//call action creator to sign up the user
		this.props.signupUser(formValues, this.props.history);

	}

	renderAlert(){
		if(this.props.errorMessage){
			return(
				<div className="alert alert-danger">
					<strong>Ooops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	renderFormField(field){
		const{ touched, error } = field.meta;

		return(
			<fieldset className="form-group">
				<label>{field.label}</label>
				<input 
					className="form-control" 
					name={field.name}
					type={field.type}
					{...field.input}
				/>
				{touched && error && <div className="text-danger">{error}</div>}
			</fieldset>
		);
	}


	render(){
		const { handleSubmit } = this.props;

		return(
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field 
					type="text"
					label="Email"
					name="email"
					component={this.renderFormField}
				/>
				<Field 
					type="password"
					label="Password"
					name="password"
					component={this.renderFormField}
				/>
				<Field 
					type="password"
					label="Confirm Password"
					name="confirmPassword"
					component={this.renderFormField}
				/>
				{this.renderAlert()}
				<button className="btn btn-primary">Sign up!</button>
			</form>
		);
	}

}

const validate = (formValues) => {
	const errors = {};

	if(!formValues.email){
		errors.email = 'Please enter an email';
	}

	if(!formValues.password){
		errors.password = 'Please enter a password';
	}

	if(!formValues.confirmPassword){
		errors.confirmPassword = 'Please enter a password confirmation';
	}

	if(formValues.password !== formValues.confirmPassword){
		errors.password = 'Passwords must match';
	}


	return errors;
}

const mapStateToProps = (state) => {

	return { errorMessage: state.auth.error };
}

export default reduxForm({
	validate,
	form: 'signup'
})(
	withRouter(
		connect( mapStateToProps, {signupUser: actions.signupUser})(Signup)
	)
);

