import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/';

class Signin extends Component {

	handleFormSubmit(formValues){
		this.props.signinUser(formValues, this.props.history);
	}


	renderFormField(field){
		return(
			<fieldset className="form-group">
				<label>{field.label}</label>
				<input 
					className="form-control" 
					name={field.name}
					type={field.type}
					{...field.input}
				/>
			</fieldset>
		);
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
				{this.renderAlert()}
				<button className="btn btn-primary">Signin</button>
			</form>
		);
	}

}

const mapStateToProps = (state) => {
	return { errorMessage: state.auth.error }
}


export default reduxForm({
	form: 'signin'
})(
	withRouter(
		connect( mapStateToProps, {signinUser: actions.signinUser})(Signin)
	)
);



