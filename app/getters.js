const allTasks = [
    ['tasks'], (tasks) => {
        return tasks;
    }
];

const filters = [
	['filters'], (filters)=>{
		return filters;
	}
];

const filteredTasks = [
    ['tasks'],
    ['filters'], (tasks, filters) => {
        function filterByAssignee(tasks, assignee) {
        	if(!assignee){
        		return tasks;
        	}

            return tasks.filter((t) => {
                return t.get('assignedTo') === assignee
            });;
        }
        function filterByLabels(tasks, _labels) {
            var labels = _labels.split(';#');
            if(!_labels || labels.length === 0){
            	return tasks;
            }

            return tasks.filter((t) => {
                return labels.every((label => {
                    return t.get('labels').contains(label) ;
                }))
            });;
        }
        function filterBySearch(tasks, search) {
            return tasks.filter((t) => {
                return t.get('title').indexOf(search) > -1
            });
        }

        var tasks0 = filterBySearch(tasks, filters.get('search'));
        var tasks1 = filterByAssignee(tasks0, filters.get('assigneeFilter'));
        var tasks2 = filterByLabels(tasks1, filters.get('labelsFilter'));
        return tasks2;
    }
]

export default {
    allTasks, filteredTasks, filters
}
