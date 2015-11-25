import * as React from 'react'
import * as ReactDom from 'react-dom'
import {Container} from './components/Container'
import TaskStore from './taskStore'
import FilterStore from './filterStore'
import UserStore from './UserStore'
import reactor from './reactor'
require('normalize.css')
require('./common.css')

reactor.registerStores({
	'tasks': TaskStore,
	'filters': FilterStore,
	'users': UserStore
});

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
    	return <div><Container/></div>;
    }
}
ReactDom.render(<App/>, document.getElementById('app'));