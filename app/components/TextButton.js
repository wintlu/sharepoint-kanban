import React from 'react';

export class TextButton extends React.Component {
	constructor(props){
		super(props)
		this.state = {hover: false};
	}

	render(){
		var _styles = {
			cursor: this.props.disabled ? null: 'pointer',
			textAlign: 'center',
			display: this.props.display === 'block' ? 'block' : 'inline'
		};
		var gray = '#888';
		var dark = '#333';
		var color = this.props.disabled ? gray 
			: (this.state.hover ? this.props.hoverColor || dark 
			: this.props.color || gray);

		var styles = Object.assign(_styles, {color}, this.props.style);

		var self = this;
		return <span style={styles}
			onMouseOver={()=>self.setState({hover: true})}
			onMouseOut={()=>self.setState({hover: false})}
			onClick={()=>{if(!this.props.disabled){this.props.onClick()}}} dangerouslySetInnerHTML={{__html: this.props.text}}>
			</span>
	}
}