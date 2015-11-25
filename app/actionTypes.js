import keyMirror from 'react/node_modules/fbjs/lib/keyMirror';

export default keyMirror({
	//UI actions
	SEARCH: null,
	FILTER_ASSIGNEE: null,
	FILTER_LABELS: null,
	LOAD_FILTER_OPTIONS: null,

	TOGGLE_ADD_TASK_FORM: null,


	//Tasks data
	LOAD_TASKS_START: null,
	LOAD_TASKS_SUCCESS: null,
	LOAD_TASKS_FAILED: null,
	
	PROCEED_TASK: null,

	ADD_TASK_START: null,
	ADD_TASK_SUCCESS: null,
	ADD_TASK_FAILED: null,

	//Users data
	LOAD_USER: 'LOAD_USER'
});