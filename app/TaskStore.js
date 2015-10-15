import {Store, toImmutable} from 'nuclear-js';
import {PROCEED_TASK, 
	ADD_TASK, 
	LOAD_TASKS_START, 
	LOAD_TASKS_SUCCESS, 
	LOAD_TASKS_FAILED
} from './actionTypes';

export default Store({
	getInitialState(){
		return toImmutable([]);
	},

	initialize(){
		this.on(PROCEED_TASK, proceedTask);
		this.on(ADD_TASK, addTask);
		this.on(LOAD_TASKS_START, (tasks)=>tasks);
		this.on(LOAD_TASKS_SUCCESS, (tasks, payload)=> toImmutable(payload));
		this.on(LOAD_TASKS_FAILED, (tasks, payload)=> tasks);
	}
});

function addTask(tasks, payload){
	return tasks.push(toImmutable(payload));
}

function proceedTask (tasks, taskId) {
	var index = findTaskIndexById(tasks, taskId);
	var currentStatus = tasks.getIn([index, 'status']);
	var nextStatus = getNextTaskStatus(currentStatus);
	return tasks.setIn([index, 'status'], nextStatus);
}


function findTaskIndexById(tasks, taskId){
	return tasks.findIndex(t=> t.get('id') === taskId);
}

function getNextTaskStatus (status) {
	var mapping = ['Not Started', 'In Progress', 'Completed', 'Backup'];
	var index = mapping.indexOf(status);
	return mapping[index+1];
}


function receiveProducts(state, { products }) {
  let newProducts = toImmutable(products)
    .toMap()
    .mapKeys((k, v) => v.get('id'))
  return state.merge(newProducts)
}