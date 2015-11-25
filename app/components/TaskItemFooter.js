import React from 'react';
import {TextButton} from './TextButton';
import {UserSpan} from './UserSpan';
import actions from '../actions'
import {DEBUG} from '../spProxy';

export class TaskItemFooter extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		var self = this;
    var labels = this.props.labels || [];
		return <div className="clearfix">
			{labels.map((label)=>
                <span key={label} style={this.getLabelStyle()}>{label}</span>
             )}
			<TextButton onClick={this.onEditClick.bind(this)} style={{float: 'right'}} text="&#x270e;"/>
			{this.getUsers()}
		</div>;
	}

  getUsers(){
    return this.props.assignee ? this.props.assignee.map(userId => 
        <UserSpan style={this.getDimTextStyle()} key={userId} id={userId}/>) : null
  }

  getLabelStyle(){
    return {
      backgroundColor: '#888',
      borderRadius: 4,
      padding: '3px 5px',
      marginRight: 3,
      fontSize: 13,
      color: '#eee'
    }
  }

  getDimTextStyle(){
  	 return {
  	 	fontSize: 13,
  	 	color: '#777',
  	 	padding: '3px 5px',
  	 	fontStyle: 'italic',
  	 	float: 'right'
  	 }
  }
  onEditClick(){
    this.openEditTaskDialog();
  }

  openEditTaskDialog(){
    if(DEBUG){
      alert('edit task: ' + this.props.taskId);
      return;
    }
    var options = SP.UI.$create_DialogOptions();
    options.title = "Edit Task";
    options.url = "/bu/dpc/admin/ITPortal/Application/Lists/Work%20Tasks/EditForm.aspx?IsDlg=true&ID=" + this.props.taskId;
    options.dialogReturnValueCallback = (dialogResult, returnValue)=>{
      if(dialogResult === 1){
        //refresh
        actions.loadTasks();
      }
    };
    SP.UI.ModalDialog.showModalDialog(options);
  }  
}