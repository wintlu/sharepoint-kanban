import React from 'react';
import {TaskItem} from './TaskItem'

export class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var filtered = this.filterByStatus(this.props.tasks, this.props.title);
    if(this.props.assignee){
      filtered = this.filterByAssignee(filtered, this.props.assignee);
    }

    if(this.props.labels){
      filtered = this.filterByLabels(filtered, this.props.labels);
    }

    if(this.props.search){
      filtered = this.filterBySearch(filtered, this.props.search);
    }

  	var styles = {backgroundColor: this.bgColor(this.props.title)};

    return (
      <div style={styles}>
      	<h3>{this.props.title}</h3>
      	<div>
	      {filtered.map(function(task){
	      	return <TaskItem key={task.id} task={task}/>;
	      })}
      	</div>
      </div>
    );
  }

  filterByStatus(tasks, statusCondition){
    return tasks.filter((t)=>{return t.status === statusCondition});
  }

  filterByAssignee(tasks, assignee){
    return tasks.filter((t)=>{return t.assignedTo === assignee});;
  }

  filterByLabels(tasks, _labels){
    var labels = _labels.split(';#');
    return tasks.filter((t) => {
      return labels.every((label=>{return t.labels.indexOf(label)>-1}))
    });;
  }

  filterBySearch(tasks, search){
    return tasks.filter((t)=> {return t.title.indexOf(search)>-1});
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

TaskList.propTypes = { search: React.PropTypes.string };
TaskList.defaultProps = { search: '', assignee: '', labels: ''};
