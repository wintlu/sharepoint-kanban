import React from 'react'
import {TaskList} from './TaskList'

export class TaskListContainer extends React.Component{

	render(){
        var tasks = this.props.tasks;
		var columnStyle = {
            width: '33.33%',
            float: 'left'
        };

		return (<div> 
                    <div>Tasks Count: {this.props.tasks.size}</div>
                    <div style = {columnStyle} >
                        <TaskList title="Not Started" tasks={this.filterByStatus(tasks, 'Not Started')} filterOptions={this.props.filterOptions}/ > </div> 
                    <div style = {columnStyle} >
                        <TaskList title="In Progress" tasks={this.filterByStatus(tasks, 'In Progress')} filterOptions={this.props.filterOptions}/ > </div> 
                    <div style = {columnStyle} >
                        <TaskList title="Completed" tasks={this.filterByStatus(tasks, 'Completed')} filterOptions={this.props.filterOptions}/ > </div>
                </div>);
	}

    componentDidMount(){
    }

    filterByStatus(tasks, statusCondition){
        return tasks.filter((t)=>{return t.get('status') === statusCondition});
    }
}