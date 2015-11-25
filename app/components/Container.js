import React from 'react';
import {TaskList} from './TaskList';
import {Toolbar} from './Toolbar';
import {TaskListContainer} from './TaskListContainer';
import {TextButton} from './TextButton';
import {MessageBanner} from './MessageBanner';
import {Dialog} from './Dialog';
import {NewTaskForm} from './NewTaskForm';

import * as getters from '../getters';
import reactor from '../reactor';
import actions from '../actions';
import styles from '../styles';

export var Container = React.createClass({
    mixins: [reactor.ReactMixin],

    getDataBindings(){
        return {
            tasks: getters.taskItems,
            addTaskFormOpen: getters.addTaskFormOpen,
            adding: getters.adding,
            filteredTasks: getters.filteredTasks,
            filters: getters.filters,
            loading: getters.loading,
            messages: getters.messages,
            users: getters.users
        };
    },

    componentDidMount(){
        actions.loadTasks();
    },

    render(){
        var titleStyle = Object.assign({
            fontSize: 30,
        }, styles.grid(30));
        return (
        <div>
            {this.state.addTaskFormOpen ? 
                <Dialog title="Add New Task" onCancel={()=>actions.toggleAddTaskForm()}>
                    <NewTaskForm adding={this.state.adding}/>
                </Dialog>
                : null
            }
            <div className="clearfix">
                <div style={titleStyle}>Kanban
                    <TextButton disabled={this.state.loading ? true: false} 
                        style={{marginLeft: 20, fontSize: 25}} 
                        onClick={()=> actions.loadTasks()} 
                        text={this.state.loading ? '...loading': '&#x21ba;'}/>
                </div>
                <div style={styles.grid(70)}>
                    <Toolbar style={styles.grid(70)} filterOptions = {this.state.filters}/>
                </div>
            </div>

            <TaskListContainer tasks={this.state.filteredTasks} adding={this.state.adding}/>
            <MessageBanner messages={this.state.messages}/>
         </div>
        );
    }
})
