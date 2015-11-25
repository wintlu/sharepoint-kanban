import jQuery from 'jquery';
import {Mapping} from './mapping';

export var DEBUG = true;
DEBUG = location.href.indexOf('localhost') > -1 ? true : false;

//SharePoint site settings
var settings = {
    TaskListName: 'Work Tasks',
    __REQUESTDIGEST: DEBUG ? 'fake-REQUESTDIGEST' : document.getElementById('__REQUESTDIGEST').value,
    itemsUrl: DEBUG ? 'fake-url' : _spPageContextInfo.webServerRelativeUrl + `/_api/web/lists/GetByTitle('Work Tasks')/items`,
    itemType: 'SP.Data.Work_x0020_TasksListItem',
}


function getSPTask(_id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: _id,
                title: 'New added task',
                assignedTo: null,
                description: '',
                status: 'Not Started',
                labels: []
            });
        }, 500);
    });
}

export function getSPTasks(){
    if (DEBUG) {
        return new Promise((resolve, reject) => {
			var sample = require("json!./sample-tasks.json");
			var items = sample.d.results;
			var itemsClient = Mapping.toClientItems(items);
			setTimeout(()=>resolve(itemsClient), 500);
        })
    }

    //Production environment
    return new Promise((resolve, reject) => {
          jQuery.ajax({
            url: settings.itemsUrl,
            method: 'GET',
            contentType: 'application/json;odata=verbose',
            headers: {
                'Accept': 'application/json;odata=verbose'
            },
            success: (res) => {
            	var itemsClient = Mapping.toClientItems(res.d.results);
                resolve(itemsClient);
            },
            error: (err) => reject(err)
    	});
	});
}


export function addSPTask(payload){
    if(DEBUG){
        const DEBUG_ERROR = false;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var newId = Math.floor(Math.random() * 10000);
                DEBUG_ERROR ? reject('error happend') : getSPTask(newId).then((newTask)=>resolve(newTask));
            }, 500);
        });
    }

    return new Promise((resolve, reject) => {
        const serverItem = Mapping.toServerItem(payload);
        jQuery.ajax({
            url: settings.itemsUrl,
            method: 'POST',
            data: JSON.stringify({ '__metadata': { 'type': settings.itemType }, ...serverItem}),
            headers: {
                'X-RequestDigest': settings.__REQUESTDIGEST,
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            },
            success: (res) =>{
                console.log('addSPTask return');
                console.log(res);
                const itemClient = Mapping.toClientItem(res.d);
                resolve(itemClient);
            },
            error: (err) => reject(err)
        })
    });
    
}

export function loadUser(_id){
    const DEBUG_USER = true;
    if(DEBUG && DEBUG_USER){
        return new Promise((resolve)=>  setTimeout(()=> {
            const sample = require("json!./sample-user.json");
        	resolve({Id: sample.d.Id, Title: sample.d.Title});
        	}, 1000));
    }

    return new Promise((resolve, reject) => {
          jQuery.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/getuserbyid('+_id+')',
            method: 'GET',
            contentType: 'application/json;odata=verbose',
            headers: {
                'Accept': 'application/json;odata=verbose'
            },
            success: (res) => {
                resolve({Id: sample.d.Id, Title: sample.d.Title});
            },
            error: (err) => reject(err)
        });
    });
}