var redux = require('redux');

console.log('Starting redux example...');

var nameReducer = (state='Anonymous', action) => {
                  switch (action.type) {
                    case "CHANGE_NAME":
                      return action.name
                    default:
                      return state;
                  }
                };
var changeName = (name)=>{
  return {
    type: "CHANGE_NAME",
    name //ES6 feature: equivalent to 'name: name'
  }
};

var nextHobbyId = 1;
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

var addHobbie = (hobby) =>{
    return {
      type: "ADD_HOBBIE",
      hobby
    };
};
var removeHobbie = (id) =>{
    return {
      type: "REMOVE_HOBBIE",
      id
    };
};
var nextMovieId = 1;
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

var addMovie = (movie,genre) =>{
    return {
      type: "ADD_MOVIE",
      movie,
      genre
    };
};
var removeMovie = (id) =>{
    return {
      type: "REMOVE_MOVIE",
      id
    };
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

store.dispatch(changeName('Urbino'));
store.dispatch(addHobbie('Running'));
store.dispatch(addHobbie('Travel'));
store.dispatch(addHobbie('Walking'));
store.dispatch(removeMovie(2));
store.dispatch(addMovie('Titanic', 'Romance'));
store.dispatch(addMovie('Titanic II', 'Romance'));
store.dispatch(addMovie('BBC - Wild life', 'Documentary'));
store.dispatch(removeMovie(1));

store.dispatch(changeName('Nuno'));
