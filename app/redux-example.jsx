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
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f=> f
  /*
  // the same as above
  window.devToolsExtension ? window.devToolsExtension() : (f)=> {
    return f;
  }
  */
));
// subcribe to cjhanges
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  console.log('Name is ', state.name);
  document.getElementById('app').innerHTML = state.name;
});
// we can call unsubscribe() to stop subscrition to store changes;

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Urbino'
});
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Nuno'
});
