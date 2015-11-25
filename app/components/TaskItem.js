import React from 'react';
import reactor from '../reactor';
import getters from '../getters';
import actions from '../actions';
import styles from '../styles';
import {TaskItemFooter} from './TaskItemFooter';


export class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.onProceed = this.onProceed.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {collapsed: false, titleHover: false};
  }

  render() {
    var self = this;
    return (
      <div style={this.getItemStyle()}>
        <div style={this.getTitleStyle()} 
             onClick={this.toggleCollapse}
             onMouseOver={()=>self.setState({titleHover: true})} 
             onMouseOut={()=>self.setState({titleHover: false})}> 
            <span style={this.getProceedStyle()} title="Click to move this task to next stage" onClick={this.onProceed}> &#x27a4; </span>
            <span>{this.props.task.get('title')}</span>
        </div>
        {this.state.collapsed ? null : 
          <div>
            <div style={this.getBodyStyle()}>
              {this.state.collapsed ? null : this.getDescription()}
            </div>
            <div>
              <TaskItemFooter taskId={this.props.task.get('id')} assignee={this.props.task.get('assignee')} labels={this.props.task.get('labels')}/>
            </div>
          </div>
        }
      </div>
    );
  }

  getDescription(){
    var desc = {
      __html: this.props.task.get('description')
    }
    return <div dangerouslySetInnerHTML={desc}></div>
  }

  toggleCollapse(){
    var curCollapse = this.state.collapsed;
    this.setState({collapsed: !curCollapse})
  }

  onProceed(){
  	actions.proceedTask(this.props.task.get('id'));
  }

  getItemStyle(){
    return {
      // border: '1px solid #ddd',
      fontSize: 20,
      marginBottom: 5,
      padding: 5,
      backgroundColor: this.props.backgroundColor
    };
  }

  getBodyStyle(){
    return {
      fontSize: 15,
      color: '#555',
      padding: 5
    };
  }

  getTitleStyle(){
    return {
      color: this.props.color,
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      whiteSpace: this.state.collapsed ? 'nowrap' : null,
    };
  }

  getProceedStyle(){
  	return {
  		cursor: 'pointer',
  		color: styles.getNextStageColor(this.props.task.get('status'))
  	};
  }
}