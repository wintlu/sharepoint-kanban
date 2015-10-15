import React from 'react';
import reactor from '../reactor';
import getters from '../getters';
import actions from '../actions';


export class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
  }

  render() {
    return (
      <div>
      	 <div><input ref="title" type="text" placeholder="Task Title"/></div>
         <div><input ref="description" type="text" placeholder="Task Description"/></div>
         <div><button onClick={this.props.onCancel}>Cancel</button> <button onClick={this.addTask}>OK</button>  </div>
      </div>
    );
  }

  addTask(){
    var newId = Math.round((Math.random()*100000));
    actions.addTask({id:newId, title: this.refs.title.value, status: 'Not Started'});
    this.props.onSave();
  }
}