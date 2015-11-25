import {Store, toImmutable} from 'nuclear-js';
import {PROCEED_TASK, 
	TOGGLE_ADD_TASK_FORM,
	ADD_TASK_START,
	ADD_TASK_SUCCESS,
	ADD_TASK_FAILED,
	LOAD_TASKS_START, 
	LOAD_TASKS_SUCCESS, 
	LOAD_TASKS_FAILED
} from './actionTypes';
import config from './config';

export default Store({
	getInitialState(){
		return toImmutable({
			loading: true, 
			items: [], 
			messages: [], 
			adding: null, //{error: null, task: null},
			addTaskFormOpen: false});
	},

	initialize(){
		this.on(TOGGLE_ADD_TASK_FORM, (tasks)=>tasks.setIn(['addTaskFormOpen'], !tasks.get('addTaskFormOpen')));
		this.on(PROCEED_TASK, proceedTask);
		this.on(LOAD_TASKS_START, (tasks)=> tasks.set('loading', true));
		this.on(LOAD_TASKS_SUCCESS, loadTaskSuccess);
		this.on(LOAD_TASKS_FAILED, loadTasksFailed);

		this.on(ADD_TASK_START, addTaskStart);
		this.on(ADD_TASK_SUCCESS, addTaskSuccess);
		this.on(ADD_TASK_FAILED, addTaskFailed);
	}
});

function taskItems (tasks) {
	return tasks.get('items');
}

function loadTaskSuccess (tasks, payload) {
	return tasks.setIn(['loading'], false).setIn(['items'], toImmutable(payload));
}

function loadTasksFailed(tasks, error) {
	return tasks.setIn(['loading'], false)
	.setIn(['messages'], messages => messages.push({type: 'error', message: 'Failed to load tasks: ' + error}));
}

function addTaskStart(tasks, payload){
	var _payload = toImmutable(payload);
	return tasks.set('adding', toImmutable({})).setIn(['adding','task'], _payload);
}

function addTaskSuccess(tasks, added){
	return tasks.setIn(['adding'], null).updateIn(['items'], items=>items.push(toImmutable(added)));
}

function addTaskFailed(tasks, error){
	return tasks.setIn(['adding', 'error'], error);
}

function proceedTask (tasks, taskId) {
	var items = taskItems(tasks);
	var index = findTaskIndexById(items, taskId);
	var currentStatus = items.getIn([index, 'status']);
	var nextStatus = config.nextStatus(currentStatus);
	return tasks.setIn(['items',index, 'status'], nextStatus);
}


function findTaskIndexById(items, taskId){
	return items.findIndex(t=> t.get('id') === taskId);
}

