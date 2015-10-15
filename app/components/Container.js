import React from 'react';
import {TaskList} from './TaskList';
import {Toolbar} from './Toolbar';
import {TaskListContainer} from './TaskListContainer';

import getters from '../getters';
import reactor from '../reactor';
import actions from '../actions';

export var Container = React.createClass({
    mixins: [reactor.ReactMixin],

    getDataBindings(){
        return {
            tasks: getters.allTasks,
            filteredTasks: getters.filteredTasks,
            filters: getters.filters
        };
    },

    componentDidMount(){
        actions.loadTasks();
    },

    render(){
        return (
        <div>
             <Toolbar filterOptions = {this.state.filters}/>
             <TaskListContainer tasks={this.state.filteredTasks}/>
         </div>
        );
    }
})
