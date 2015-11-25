import React from 'react';
import reactor from '../reactor';
import getters from '../getters';
import actions from '../actions';
import styles from '../styles';

export class AddTaskItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var self = this;
    return (
      <div style={this.getItemStyle()}>
        <div style={this.getTitleStyle()}>
            <span>{this.props.task.get('title')}</span>
        </div>
      </div>
    );
  }

  getItemStyle(){
    return {
      fontSize: 20,
      marginTop: 5,
      padding: 5,
      backgroundColor: this.props.backgroundColor
    };
  }

  getTitleStyle(){
    return {
      color: this.props.color,
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      whiteSpace: 'nowrap'
    };
  }
}