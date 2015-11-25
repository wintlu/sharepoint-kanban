import React from 'react';

export class Dialog extends React.Component {
	constructor(props){
		super(props);
	}
	render(){

		if(this.props.open === false){
			return null;
		}

		var wrapperStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			zIndex: 100,
		};

		var maskStyle = {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: '#222',
			opacity: 0.8,
		};

		var containerStyle = {
			top: 100,
			zIndex: 3,
			margin: '0 auto',
			minHeight: 100,
			minWidth: 500,
			width: '50%',
			backgroundColor: '#fff',
			position: 'relative',
			padding: 10
		};
		var titleStyle = {
		};
		var bodyStyle = {};
		return (
			<div style={wrapperStyle} role="dialog-wrapper">
				<div style={maskStyle} onClick={this.onCancel.bind(this)}>
				</div>
				<div style={containerStyle} role="container">
					<h3 style={titleStyle}>{this.props.title}</h3>
					<div style={bodyStyle}>
						{this.props.children}
					</div>
				</div>
			</div>
			);
	}

	onCancel(){
		this.props.onCancel()
	}
}

Dialog.propTypes = {
	onCancel: React.PropTypes.func.isRequired
}