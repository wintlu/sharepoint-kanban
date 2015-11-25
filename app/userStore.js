import {Store, toImmutable} from 'nuclear-js';
import {LOAD_USER, 
} from './actionTypes';
import config from './config';

export default Store({
	getInitialState(){
		return toImmutable({__metadata:{}});

	},

	initialize(){
		this.on(LOAD_USER, loadUser);
	}
});

function loadUser (users, user) {
	return users.set(user.Id, user.Title);
}