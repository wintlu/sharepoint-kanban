
export class TaskStore {
  constructor() {
  }

  getTasks(cb){
  	setTimeout(function () {
  		var data = [{
		  		id: 1, assignedTo: 'wint.lu', title: 'task1',status: 'Not Started', labels: ['SharePoint', 'SAP']
		  	},{
		  		id: 2, assignedTo: 'wint.lu', title: 'task2',status: 'Not Started', labels: ['SAP']
		  	},{
		  		id: 3, assignedTo: 'devin.zeng', title: 'task3',status: 'In Progress', labels: ['Portal','SharePoint']
		  	},{
		  		id: 4, assignedTo: 'wenli.fang', title: 'task4',status: 'Completed', labels: []
		  	}];
  		cb(data);
  	}, 100);
  }

  getLabels(tasks){
  	var labels = {};
  	tasks.forEach(t => { t.labels.forEach(l=>{labels[l]=l;})});
  	return Object.keys(labels).map(l=> {return {value: l, label: l}});
  }

  getAssignees(tasks){
  	var assignees = {};
  	tasks.forEach(t => {assignees[t.assignedTo] = t.assignedTo});
  	return Object.keys(assignees).map(l=> { return {value: l, label: l}});
  }
}