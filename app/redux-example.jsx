var redux = require('redux');
const $ = require('jquery');

console.log('Starting redux example...');

const actions = require('./actions/index');
const store = require('./store/configureStore').configure();


// subcribe to cjhanges
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  var $app = $('#app')[0];

  if (state.map.isFechting) {
    $app.innerHTML = "Loading...";
  } else {
    $app.innerHTML =  '<a target="_blank" href="'+ state.map.url +
                      '">New window to view your IP\'s physical location"</a>'+
                      '<iframe height="900" width="100%" style="border:none;" src="'+
                      state.map.url +'"></iframe>';
  }
  // document.getElementById('app').innerHTML = state.name;
  //console.log(state);
});
// we can call unsubscribe() to stop subscrition to store changes;

store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName('Urbino'));
store.dispatch(actions.addHobbie('Running'));
store.dispatch(actions.addHobbie('Travel'));
store.dispatch(actions.addHobbie('Walking'));
store.dispatch(actions.removeMovie(2));
store.dispatch(actions.addMovie('Titanic', 'Romance'));
store.dispatch(actions.addMovie('Titanic II', 'Romance'));
store.dispatch(actions.addMovie('BBC - Wild life', 'Documentary'));
store.dispatch(actions.removeMovie(1));
store.dispatch(actions.changeName('Nuno'));
