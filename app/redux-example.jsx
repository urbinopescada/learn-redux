var redux = require('redux');

console.log('Starting redux example...');

var reducer = (state = {name:'anonymous'}, action) =>{
    switch (action.type) {
      case "CHANGE_NAME":
        return {...state, name: action.name};
        break;
      default:
        return state;
    }
  };
var store = redux.createStore(reducer);

console.log('currentState',store.getState());

var action ={
  type: 'CHANGE_NAME',
  name: 'Urbino'
}
store.dispatch(action);
console.log('currentState',store.getState());
