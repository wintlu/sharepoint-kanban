import React from 'react';
import {TaskItem} from './TaskItem'
import {NewTaskForm} from './NewTaskForm';
import reactor from '../reactor'

export class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      addingNewTask: false
    };

    reactor.observe(['tasks'], (_tasks) => this.setState({tasks: _tasks}));
    this.addNewTaskClick = this.addNewTaskClick.bind(this);
    this.closeNewTaskForm = this.closeNewTaskForm.bind(this);
  }

  isNotStartedList(){
      return this.props.title === 'Not Started';
  }

  render() {
  	var styles = {backgroundColor: this.bgColor(this.props.title)};

    return (
      <div style={styles}>
        <div>
          <h3>{this.props.title}</h3>
          {this.isNotStartedList()? <button onClick={this.addNewTaskClick}>New Task</button> : null}
        </div>
        {this.state.addingNewTask ? <NewTaskForm onCancel={this.closeNewTaskForm} onSave={this.closeNewTaskForm}/> : null}
      	<div>
          {this.props.tasks.map(t=>{
            return <TaskItem key={t.get('id')} task={t}/>
          })}
      	</div>
      </div>
    );
  }

  addNewTaskClick(){
    this.setState({addingNewTask: true});
  }

  closeNewTaskForm(){
    this.setState({addingNewTask: false});
  }

  bgColor(title){
  	var color={
  		'Not Started':'#ddd',
  		'In Progress':'#eee',
  		'Completed':'#eef'
  	}
  	return color[title];
  }
}