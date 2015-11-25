import React from 'react';

export class MessageBanner extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		var styles = {
		    position: 'absolute',
		    right: 0,
		    bottom: 0,
		    padding: 15,
		    backgroundColor: '#E57373',
		    color: '#fff'
		}
		return <div style={styles}>
			{JSON.stringify(this.props.messages)}
		</div>;
	}
}