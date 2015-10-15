import React from 'react';
import Select from 'react-select';
import actions from '../actions';

require('react-select/dist/default.css');

export class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.searchChange = this.searchChange.bind(this);
    this.assigneeFilterChange= this.assigneeFilterChange.bind(this);
    this.labelFilterChange = this.labelFilterChange.bind(this);
    this.refreshClick = this.refreshClick.bind(this);
  }

  render() {
    var selectStyle = {
    	float: 'right',
    	width: '20%'
    };

    var filters = this.props.filterOptions.toJS();

    return (
      <div>
      	<div>
      		<div className="clearfix">
      			<div style={selectStyle}>
      				<Select delimiter=";#" value={filters.labelsFilter} placeholder="Filter by label" style={selectStyle} options={filters.labelFilterOptions} multi={true} onChange={this.labelFilterChange}/>
      			</div>
      			<div style={selectStyle}>
      				<Select  delimiter=";#" value={filters.assigneeFilter} placeholder="Filter by assignee" options={filters.assigneeFilterOptions}  onChange={this.assigneeFilterChange}/>
      			</div>
      			<div style={selectStyle}>
      				<input placeholder="Search by task title" onChange={this.searchChange}/>
      			</div>
            <button onClick={this.refreshClick}>Refresh</button>
      		</div>
      	</div>
      </div>
    );
  }

  refreshClick(){
    actions.loadTasks();
  }

  searchChange(event){
  	var query = event.target.value.toLowerCase();
    actions.searchChange(query);
  }

  assigneeFilterChange(value){
  	actions.assigneeFilterChange(value);
  }

  labelFilterChange(value){
  	actions.labelFilterChange(value);
  }
}