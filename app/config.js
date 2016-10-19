var statusList = ['Not Started', 'In Progress', 'Completed', 'Backup'];

export default {
	statusList,
	nextStatus: (status)=>{
		var index = statusList.indexOf(status);
		return statusList[index+1];
	}
}
