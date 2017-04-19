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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f=> f
));

// we can call unsubscribe() to stop subscrition to store changes;
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  document.getElementById('app').innerHTML = state.searchText;
});


store.dispatch({type: 'CHANGE_SEARCH_TEXT', searchText: 'urbino'});
store.dispatch({type: 'CHANGE_SEARCH_TEXT', searchText: 'nuno'});
