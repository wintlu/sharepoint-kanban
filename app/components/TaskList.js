import React from 'react';
import {TaskItem} from './TaskItem'
// import {NewTaskForm} from './NewTaskForm';
import {TextButton} from './TextButton';
import {AddTaskForm} from './AddTaskItem';
import reactor from '../reactor'
import styles from '../styles';
import actions from '../actions';

export class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var listStyle = styles[this.props.title];

    var titleStyle = {
      color: listStyle.listTitle,
      fontSize: 20,
      lineHeight: '50px'
    };
    var self = this;

    return (
      <div style={this.getStyle()}>
        <div className="clearfix">
          <div style={titleStyle}>{this.props.title} 
          {this.props.isNotStartedList ? <AddTaskFormButton adding={this.props.adding}/> : null}</div>
        </div>
      	<div>
          {this.props.tasks.map(t=>{
            return <TaskItem color={styles[this.props.title].listTitle} backgroundColor={this.getItemBackgroundColor()} key={t.get('id')} task={t}/>
          })}
      	</div>
      </div>
    );
  }

  addTaskFormOpen (){
    return this.props.tasks.get('addTaskFormOpen');
  }

  getItemBackgroundColor(){
    return styles[this.props.title].item
  }

  getStyle(){
    return {
      backgroundColor: styles[this.props.title].list,
      padding: 5
    }
  }
}

class AddTaskFormButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return this.props.adding === null ? this.renderAdd() : (
            this.props.adding.get('error') ? this.renderError() : this.renderAdding());
  }

  btnStyle(){
    return {
      float: 'right',
      marginRight: 20
    };
  }

  renderAdding(){
    return <TextButton
            disabled={true}
            style={this.btnStyle()} 
            color={this.props.color} 
            text='Adding...'/>
  }

  renderError(){
    return <TextButton
            style={this.btnStyle()}
            color={'red'} 
            text='Error!'
            onClick={actions.toggleAddTaskForm}/>
  }

  renderAdd(){
    return <TextButton
            style={this.btnStyle()} 
            color={this.props.color} 
            text='Add'
            onClick={actions.toggleAddTaskForm}/>
  }
}