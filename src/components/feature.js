import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

	componentWillMount(){
		this.props.fetchMessage()
	}

	render(){
		if(!this.props.msg){
			 <div>Loading!!!</div>
		}
		return(
			<div>{this.props.msg}</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { msg: state.featureMessage.msg }
}

export default connect(mapStateToProps, {fetchMessage: actions.fetchMessage})(Feature);