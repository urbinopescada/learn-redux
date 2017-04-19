var redux = require('redux');

console.log('Starting redux-todo example...');

var stateDlft = {
    searchText:'',
    showCompleted: false,
    todos: []
  };
var reducer = (state = stateDlft, action) =>{
    switch (action.type) {
      case 'CHANGE_SEARCH_TEXT':
        return {
            ...state,
            searchText: action.searchText
          };
        break;
      default:
        return state;
    }
  };
var store = redux.createStore(reducer);

console.log('currentState',store.getState());
var action ={
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'ur'
}
store.dispatch(action);
console.log('currentState',store.getState());
