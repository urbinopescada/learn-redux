var redux = require('redux');

console.log('Starting redux example...');

var stateDlft =  {
    name:'anonymous',
    hobbies :[],
    movies :[]
  };

var nextHobbyId = 1;
var nextMovieId = 1;
var oldReducer = (state = stateDlft, action) =>{
    switch (action.type) {
      case "CHANGE_NAME":
        return {...state, name: action.name};
        break;
      case "ADD_HOBBIE":
        return {
            ...state,
            hobbies: [
              ...state.hobbies,
              {
                id: nextHobbyId++,
                hobby: action.hobby
              }
            ]
          };
        break;
      case "REMOVE_HOBBIE":
        return {
            ...state,
            hobbies: state.hobbies.filter(hobbie => hobbie.id!==action.id)
          };
        break;
      case "ADD_MOVIE":
        return {
            ...state,
            movies: [
              ...state.movies,
              {
                id: nextMovieId++,
                title: action.title,
                genre: action.genre
              }
            ]
          };
        break;
      case "REMOVE_MOVIE":
        return {
            ...state,
            movies: state.movies.filter(movie => movie.id!==action.id)
          };
        break;
      default:
        return state;
    }
  };


var nameReducer = (state='Anonymous', action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return action.name
    default:
      return state;
  }
};
var hobbiesReducer = (state=[], action) => {
  switch (action.type) {
    case "ADD_HOBBIE":
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case "REMOVE_HOBBIE":
      return state.filter(hobbie => hobbie.id!==action.id);
    default:
      return state;
  }
};
var moviesReducer = (state=[], action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case "REMOVE_MOVIE":
      return state.filter(movie => movie.id!==action.id)
    default:
      return state;
  }
};
var reducer= redux.combineReducers( {
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
});

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
  console.log(state);
});
// we can call unsubscribe() to stop subscrition to store changes;

store.dispatch({type: 'CHANGE_NAME', name: 'Urbino'});
store.dispatch({type: 'ADD_HOBBIE', hobby: 'Running'});
store.dispatch({type: 'ADD_HOBBIE', hobby: 'Travel'});
store.dispatch({type: 'ADD_HOBBIE', hobby: 'Walking'});
store.dispatch({type: 'REMOVE_HOBBIE', id: 2});
store.dispatch({type: 'ADD_MOVIE', title: 'Titanic', genre:'Romance'});
store.dispatch({type: 'ADD_MOVIE', title: 'Titanic II', genre:'Romance'});
store.dispatch({type: 'ADD_MOVIE', title: 'BBC - Wild life', genre:'Documentary'});
store.dispatch({type: 'REMOVE_MOVIE', id: 1});
store.dispatch({type: 'CHANGE_NAME',name: 'Nuno'});
