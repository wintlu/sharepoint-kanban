import React from 'react';
import {TaskList} from './TaskList';
import {Toolbar} from './Toolbar';

export class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            search: '',
            labels: '',
            assignee: ''
        };
        this.onSearch = this.onSearch.bind(this);
        this.assigneeFilterChange = this.assigneeFilterChange.bind(this);
        this.labelFilterChange = this.labelFilterChange.bind(this);
    }

    componentDidMount(){
        this.props.taskStore.getTasks( (tasks)=> {
            this.setState({tasks});
        });
    }

    render() {
        var columnStyle = {
            width: '33.33%',
            float: 'left'
        };

        var loadingDiv = <div>Loading...</div>;
        var assigneeOptions = this.props.taskStore.getAssignees(this.state.tasks);
        var labelOptions = this.props.taskStore.getLabels(this.state.tasks);

        return <div >
                <Toolbar
                    searchChange={this.onSearch}
                    assigneeOptions = {assigneeOptions}
                    assigneeFilterChange={this.assigneeFilterChange}
                    assigneeValue = {this.state.assignee}
                    labelFilterChange={this.labelFilterChange}
                    labelOptions = {labelOptions}
                    labelsValue = {this.state.labels}/>
                {(this.state.tasks.length === 0)? loadingDiv :
                <div >
                    <div style = {columnStyle} > 
                        <TaskList title="Not Started" 
                            search={this.state.search} 
                            assignee={this.state.assignee} 
                            labels={this.state.labels} 
                            tasks={this.state.tasks}/ > </div> 
                    <div style = {columnStyle} > 
                        <TaskList title="In Progress" 
                            search={this.state.search} 
                            assignee={this.state.assignee} 
                            labels={this.state.labels} 
                            tasks={this.state.tasks}/ > </div> 
                    <div style = {columnStyle} > 
                        <TaskList title="Completed" 
                            search={this.state.search} 
                            assignee={this.state.assignee} 
                            labels={this.state.labels} 
                            tasks={this.state.tasks}/ > </div>
                </div>
                }
            </div>;
    }

    onSearch(query){
        this.setState({search: query});
    }

    assigneeFilterChange(arg){
        this.setState({assignee: arg});
    }

    labelFilterChange(arg){
        this.setState({labels: arg});
    }
}
