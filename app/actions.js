import reactor from './reactor';
import {getSPTasks, addSPTask, updateSPTask} from './spProxy';
import {
    SEARCH,
    FILTER_ASSIGNEE,
    FILTER_LABELS,

    LOAD_TASKS_START,
    LOAD_TASKS_SUCCESS,
    LOAD_TASKS_FAILED,

    PROCEED_TASK,
    ADD_TASK
}
from "./actionTypes";

export default {
    searchChange(value) {
        reactor.dispatch(SEARCH, value);
    },

    assigneeFilterChange(value){
        reactor.dispatch(FILTER_ASSIGNEE, value);
    },

    labelFilterChange(value){
        reactor.dispatch(FILTER_LABELS, value);
    },

    loadTasks(){
        reactor.dispatch(LOAD_TASKS_START);
        getSPTasks().then((tasks)=>{
            reactor.dispatch(LOAD_TASKS_SUCCESS, tasks);
        });
    },

    proceedTask(id) {
        reactor.dispatch(PROCEED_TASK, id);
    },

    addTask(payload){
        addSPTask().then(()=>{
            reactor.dispatch(ADD_TASK, payload);
        });
    }
}
