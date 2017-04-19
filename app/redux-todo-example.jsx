var redux = require('redux');

console.log('Starting redux-todo example...');

var stateDlft = {
    searchText:'',
    showCompleted: false,
    todos: []
  };
var reducer = (state = stateDlft, action) =>{

    return state;
  };
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState',currentState);
