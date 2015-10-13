import React from 'react';
import Select from 'react-select';
require('react-select/dist/default.css');

export class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.searchChange = this.searchChange.bind(this);
    this.assigneeFilterChange= this.assigneeFilterChange.bind(this);
    this.labelFilterChange = this.labelFilterChange.bind(this);
  }

  render() {
    var selectStyle = {
    	float: 'right',
    	width: '20%'
    };

    return (
      <div>
      	<div>
      		<div className="clearfix">
      			<div style={selectStyle}>
      				<Select delimiter=";#" value={this.props.labelsValue} placeholder="Filter by label" style={selectStyle} options={this.props.labelOptions} multi={true} onChange={this.labelFilterChange}/>
      			</div>
      			<div style={selectStyle}>
      				<Select  delimiter=";#" value={this.props.assigneeValue} placeholder="Filter by assignee" options={this.props.assigneeOptions} onChange={this.assigneeFilterChange}/>
      			</div>
      			<div style={selectStyle}>
      				<input placeholder="Search by task title" onChange={this.searchChange}/>
      			</div>
      		</div>
      	</div>
      </div>
    );
  }

  searchChange(event){
  	var search = event.target.value.toLowerCase();
  	// location.hash = '#search=' + search;
  	if(this.props.searchChange){
		this.props.searchChange(search);
	}
  }

  assigneeFilterChange(arg){
  	if(this.props.assigneeFilterChange){
  		this.props.assigneeFilterChange(arg);
  	}
  }

  labelFilterChange(arg){
  	if(this.props.labelFilterChange){
  		this.props.labelFilterChange(arg);
  	}
  }
}