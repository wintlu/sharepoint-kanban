import reactor from './reactor';
import {getSPTasks, addSPTask, updateSPTask, loadUser} from './spProxy';
import {
    SEARCH,
    FILTER_ASSIGNEE,
    FILTER_LABELS,
    LOAD_FILTER_OPTIONS,

    TOGGLE_ADD_TASK_FORM,

    LOAD_TASKS_START,
    LOAD_TASKS_SUCCESS,
    LOAD_TASKS_FAILED,

    PROCEED_TASK,

    ADD_TASK_START,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,

    LOAD_USER
}
from "./actionTypes";


function ensureUser(id) {
    if(!reactor.evaluate(['users', id])){
        loadUser(id).then(user=>{
            reactor.dispatch(LOAD_USER, user)
        });
    }
}

function getTaskLabels (tasks) {
    var labels = {};
    tasks.forEach(t=>{
        if(t.labels){
            t.labels.forEach(label=>{labels[label]=null});
        }
    });
    return Object.keys(labels);
}

function  getTaskAssignees (tasks) {
    var assignees = {};
    tasks.forEach(t=>{
        if(t.assignee){
            t.assignee.forEach(assigneeId=>{assignees[assigneeId]=null});
        }
    });
    return Object.keys(assignees);
}

export default {
    searchChange(value) {
        reactor.dispatch(SEARCH, value);
    },

    toggleAddTaskForm(){
        reactor.dispatch(TOGGLE_ADD_TASK_FORM);
    },

    assigneeFilterChange(value){
        reactor.dispatch(FILTER_ASSIGNEE, value);
    },

    labelFilterChange(value){
        reactor.dispatch(FILTER_LABELS, value);
    },

    editTask(id){
        alert('edit tasks' + id);
    },

    loadTasks(){
        reactor.dispatch(LOAD_TASKS_START);
        getSPTasks().then(
            (tasks)=>{
                reactor.dispatch(LOAD_TASKS_SUCCESS, tasks);
                var assignees = getTaskAssignees(tasks);
                var labels = getTaskLabels(tasks);
                assignees.forEach(id=>ensureUser(id));
                reactor.dispatch(LOAD_FILTER_OPTIONS, {assignees, labels});
            },
            (error)=>reactor.dispatch(LOAD_TASKS_FAILED, error));
    },

    proceedTask(id) {
        reactor.dispatch(PROCEED_TASK, id);
    },

    addTask(payload){
        reactor.dispatch(ADD_TASK_START, payload);
        addSPTask(payload).then(
            (newTask)=> reactor.dispatch(ADD_TASK_SUCCESS, newTask),
            (error)=> reactor.dispatch(ADD_TASK_FAILED, error)
        );
    },
    ensureUser
}
