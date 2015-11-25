import React from 'react';

export class TextInput extends React.Component {
	componentDidMount(){
		if(this.props.focus){
			this.props.multiline ? this.refs.textarea.focus() : this.refs.input.focus();
		}
	}
	render(){
		var styles = Object.assign({
			borderStyle: 'none',
			display: 'block',
			width: '100%',
			backgroundColor: '#fff',
			fontSize: 15,
			padding: 5,
			color: '#555',
			boxSizing: 'border-box'
		}, this.props.style);

		var self = this;
		return (!this.props.multiline ? 
			<input type="text"
				ref="input"
				style={styles} 
				value={this.props.value}
				placeholder={this.props.placeholder} 
				onChange={(event)=> self.props.onChange(event.target.value)}
				onKeyPress={this.onKeyPress.bind(this)}/> :

			<textarea rows="4" style={styles} 
				ref="textarea"
				value={this.props.value} 
				placeholder={this.props.placeholder} 
				onChange={(event)=> self.props.onChange(event.target.value)}/>);
	}
	onKeyPress(event){
	}
}