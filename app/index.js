import * as React from 'react'
import * as ReactDom from 'react-dom'
import {Container} from './components/Container'
import TaskStore from './taskStore'
import FilterStore from './filterStore'
import reactor from './reactor'

reactor.registerStores({
	'tasks': TaskStore,
	'filters': FilterStore
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