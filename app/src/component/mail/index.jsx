import React from 'react';
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {actionHub, services, components} from '../../loader'
import {TextField} from "material-ui";

class component extends React.Component {

	handleClick() {
		console.log("gunter", this.email)
	}

	handleChange(e) {
		this.props.onChangeMail(e.target.value)
	}

	render(){
		return (
			<components.Box>
				<h2>Feature: <i>Mail</i></h2>
				<h3>Sending test email - using GoodPractice email provider</h3>
				<form>
					<label htmlFor="send" style={{paddingRight: '10px'}}>Send to:</label>
					<TextField name='send' style={{marginRight: '10px'}} onChange={this.handleChange}/>
					<RaisedButton label='Send' onClick={() => this.handleClick()}/>
				</form>
				<h1>{this.props.result}</h1>
			</components.Box>
		)
	}
};

const mapStateToProps = (state) => {
	console.log("gunter olha o state", state)
	return {
		result: services.fetch.selector.getData(state)
	}
}

const mapDispatchToProps = (dispatch) => ({
	sendMail: (data) => dispatch(actionHub.MAIL_SEND(data)),
	onChangeMail: (data) => dispatch(actionHub.MAIL_GET_EMAIL(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
