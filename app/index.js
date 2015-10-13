import * as React from 'react'
import * as ReactDom from 'react-dom'
import {Container} from './Container'
import {TaskStore} from './TaskStore'


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.taskStore = new TaskStore();
    }

    render(){
    	return <div><Container taskStore={this.taskStore}/></div>;
    }
}
ReactDom.render(<App/>, document.getElementById('app'));