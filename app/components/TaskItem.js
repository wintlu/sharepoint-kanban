import React from 'react';
import reactor from '../reactor';
import getters from '../getters';
import actions from '../actions';


export class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.onProceed = this.onProceed.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {collapsed: true, hover: false};
  }

  render() {
    return (
      <div onMouseOver={this.hover.bind(this)} 
           onMouseOut={this.unhover.bind(this)}
           style={this.getItemStyle()}
           onClick={this.toggleCollapse}>
           {this.state.hover}
      	<span style={this.getProceedStyle()} onClick={this.onProceed} tooltip="haha"> &#x2714; </span>
      		<span>{this.props.task.get('title')}</span>
          <span>&#x270e;</span>
          {this.state.collapsed ? null : <div>{this.props.task.get('description')}</div>}
      </div>
    );
  }

  hover(){
    this.setState({hover: true});
  }

  unhover(){
    this.setState({hover: false});
  }

  toggleCollapse(){
    var curCollapse = this.state.collapsed;
    this.setState({collapsed: !curCollapse})
  }

  onProceed(){
  	actions.proceedTask(this.props.task.get('id'));
  }

  getItemStyle(){
    return {
      padding: 10,
      cursor: 'pointer',
      color: this.state.hover ? 'red': '#000'
    };
  }

  getProceedStyle(){
  	return {
  		cursor: 'pointer',
  		background: '#ddf'
  	};
  }
}