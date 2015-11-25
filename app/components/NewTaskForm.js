import React from 'react';
import {Button} from './Button'
import {TextButton} from './TextButton'
import {TextInput} from './TextInput'
import reactor from '../reactor';
import getters from '../getters';
import actions from '../actions';
import styles from '../styles';


export class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    const lastTask = props.adding ? props.adding.get('task') : null;
    this.state = {
      title: lastTask ? lastTask.get('title') : '',
      description: lastTask ? lastTask.get('description'): '',
      titleError: null};
  }

  render() {
    var self = this;
    return this.renderOpen();
  }

  renderOpen(){
    var compStyles = {
      marginBottom: 5
    }
    var self = this;
    return <div style={compStyles}>
       <div style={{color: 'red'}}>{this.props.adding ? this.props.adding.get('error') : ''}</div>
       <div><TextInput focus="true" style={{marginBottom: 5}} value={this.state.title} onChange={(v)=>self.setState({title: v})} placeholder="Type task title here"/></div>
       {this.state.titleError ? <div style={this.getErrorStyle()}>{this.state.titleError}</div> : null}
       <div><TextInput multiline="true" style={{marginBottom: 5, height: 200}} value={this.state.description} onChange={(v)=>self.setState({description: v})} placeholder="Type task description here"/></div>
       <div className="clearfix">
          <div>
            <Button display="block" onClick={this.addTask} text="Create Task"/> 
          </div>
       </div>
    </div>
  }

  addTask(){
    var _title = this.state.title || '';
    if(!_title.trim()){
      this.setState({titleError: 'Title cannot be empty'})
      return;
    }

    actions.addTask({title: this.state.title, description: this.state.description, status: 'Not Started', labels: []});
    actions.toggleAddTaskForm();
  }

  getErrorStyle(){
    return {
       color: '#345',
       fontSize: 15
    }
  }
}