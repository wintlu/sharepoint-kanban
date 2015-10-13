import React from 'react';

export class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.proceedClick = this.proceedClick.bind(this);
  }

  render() {
  	var styles = {padding: 10};

    return (
      <div>
      	<span style={this.getProceedStyle()} onClick={this.proceedClick}> >> </span>
      		{this.props.task.title}
      </div>
    );
  }

  proceedClick(){
  	this.props.updateTask()
  }

  getProceedStyle(){
  	return {
  		cursor: 'pointer',
  		background: '#ddf'
  	};
  }
}