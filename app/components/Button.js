import React from 'react';

export class Button extends React.Component {
	constructor(props){
		super(props);
		this.state = {hover: false};
	}
	render(){
		var styles = Object.assign({
			borderStyle: 'none',
			cursor: 'pointer',
			backgroundColor: this.state.hover ? '#ddd' : '#eee',
			fontSize: 15,
			padding: 5,
			display: this.props.display === 'block' ? 'block' : 'inline',
			width: this.props.display === 'block' ? '100%': null,
			color: '#555'
		}, this.props.style);
		var self = this;
		return <button style={styles}
			onMouseOver={()=>self.setState({hover: true})}
			onMouseOut={()=>self.setState({hover: false})}
			onClick={this.props.onClick}>{this.props.text}</button>
	}
}