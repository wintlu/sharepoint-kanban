//SharePoint site settings
var settings = {
	TaskListName: 'Work Tasks'
}

export default {
	getSPTasks: ()=>{
		return new Promise((resolve, reject) => {
		  	setTimeout(()=>{
		  		var initData =[{
						id: 1, assignedTo: 'wint.lu', title: 'task1', description: 'task1 descript', status: 'Not Started', labels: ['SharePoint', 'SAP']
					},{
						id: 2, assignedTo: 'wint.lu', title: 'task2', description: 'task 2 de', status: 'Not Started', labels: ['SAP']
					},{
						id: 3, assignedTo: 'devin.zeng', title: 'task3',status: 'In Progress', labels: ['Portal','SharePoint']
					},{
						id: 4, assignedTo: 'wenli.fang', title: 'task4',status: 'Completed', labels: []
					}];

		  		resolve(initData);
		  	}, 500);
		});
	},

	addSPTask:(payload)=>{
		return new Promise((resolve, reject) => {
		  	setTimeout(()=>{
		  		resolve({message: 'success'});
		  	}, 500);
		});
	},

	updateSPTask:()=>{



	}
}