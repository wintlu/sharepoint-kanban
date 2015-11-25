import {Store, toImmutable} from 'nuclear-js';
import {SEARCH, FILTER_ASSIGNEE, FILTER_LABELS, LOAD_FILTER_OPTIONS} from './actionTypes';

export default Store({
	getInitialState(){
		var initData ={
			search: '',
			assigneeFilter: '',
			labelsFilter: '',
			assigneeFilterOptions: [],//[{value:'wint.lu', label:'wint.lu'}], 
			labelFilterOptions: [{value:'SharePoint', label: 'SharePoint'}, {value:'SAP',label:'SAP'}]
		};

		return toImmutable(initData);
	},

	initialize(){
		this.on(SEARCH, onSearch);
		this.on(FILTER_ASSIGNEE, onFilterAssignee);
		this.on(FILTER_LABELS, onFilterLabels);
		this.on(LOAD_FILTER_OPTIONS, onLoadFilterOptions);
	}
});

function onSearch(state, query) {
	return state.setIn(['search'], query);
}

function onFilterAssignee (state, value) {
	return state.setIn(['assigneeFilter'], value);
}

function onFilterLabels(state, value) {
	return state.setIn(['labelsFilter'], value);
}

function onLoadFilterOptions (state, value) {
	var assignees = value.assignees.map(ass=>{return {value: ass, label: null}});
	var labels = value.labels.map(l=>{return {value: l, label: l}});
	return state.setIn(['assigneeFilterOptions'], assignees).setIn(['labelFilterOptions'], labels);
}