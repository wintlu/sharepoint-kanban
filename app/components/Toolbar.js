import React from 'react';
import Select from 'react-select';
import {Button} from './Button'
import actions from '../actions';
import styles from '../styles';
import reactor from '../reactor';

require('react-select/dist/default.css');

export class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.searchChange = this.searchChange.bind(this);
    this.assigneeFilterChange= this.assigneeFilterChange.bind(this);
    this.labelFilterChange = this.labelFilterChange.bind(this);
    
    reactor.observe(['users', props.id], (_user)=>
        this.setState({user: _user}));
  }

  render() {
    var searchStyle = {
      fontSize: 14,
      padding: 8,
      width: '80%',
      display: 'block'
    };

    var filters = this.props.filterOptions.toJS();

    return (
      <div>
      	<div>
      		<div className="clearfix">
            <div style={styles.grid(40)}>
              <input style={searchStyle} placeholder="Search by task title" onChange={this.searchChange}/>
            </div>
            <div style={styles.grid(25)}>
              <Select  delimiter=";#" value={filters.assigneeFilter} placeholder="Filter by assignee" options={filters.assigneeFilterOptions}  onChange={this.assigneeFilterChange}/>
            </div>
      			<div style={styles.grid(35)}>
      				<Select delimiter=";#" value={filters.labelsFilter} placeholder="Filter by label" options={filters.labelFilterOptions} multi={true} onChange={this.labelFilterChange}/>
      			</div>
      		</div>
      	</div>
      </div>
    );
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