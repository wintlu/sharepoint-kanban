import React from 'react';
import reactor from '../reactor';
import * as getters from '../getters';
import actions from '../actions';
import styles from '../styles';

export class UserSpan extends React.Component{
    constructor(props){
    	super(props);
    	this.state={user: null};
    	reactor.observe(['users', props.id], (_user)=>
    		this.setState({user: _user}));
    }

    render(){
    	var _styles = Object.assign({}, this.props.style);
        return  <span style={_styles}>{this.state.user} </span>;
    }
};