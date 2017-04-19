var redux = require('redux');
var axios = require('axios');
const $ = require('jquery');

console.log('Starting redux example...');

// Name reducer and action generators
// --------------------
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

// Hobbies reducer and action generators
// --------------------
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

// Movies reducer and action generators
// --------------------
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

// Map reducer and action generators (asynchronous)
// --------------------
var mapReducer = (state={isFechting:false, url: null}, action)=>{
  switch (action.type) {
    case "START_LOCATION_FETCH":
       return {isFechting: true, url: null};
    case "COMPLETE_LOCATION_FETCH":
       return {
         isFechting: false,
         url: action.url
       };
    default:
      return state;
  }
};

var startLocationFetch = () =>{
    return {
      type: "START_LOCATION_FETCH"
    };
};

var completeLocationFech = (url) =>{
    return {
      type: "COMPLETE_LOCATION_FETCH",
      url
    };
};
var fetchLocation = () =>{
  store.dispatch(startLocationFetch());
  axios.get('http://ipinfo.io').then((res)=>{
    var loc = res.data.loc;
    var url = "http://maps.google.com?q=" +loc + "&output=embed";
    store.dispatch(completeLocationFech(url));
  });
};
// Finally combineReducers and create store
// --------------------
var reducer= redux.combineReducers( {
                name: nameReducer,
                hobbies: hobbiesReducer,
                movies: moviesReducer,
                map: mapReducer
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
  var $app = $('#app')[0];

  if (state.map.isFechting) {
    $app.innerHTML = "Loading...";
    console.log("loading...");
  } else {

    $app.innerHTML =  '<a target="_blank" href="'+ state.map.url +
                      '">New window to view your IP\'s physical location"</a>'+
                      '<iframe height="900" width="100%" style="border:none;" src="'+
                      state.map.url +'"></iframe>';

    console.log("not Loading");
  }
  // document.getElementById('app').innerHTML = state.name;
  //console.log(state);
});
// we can call unsubscribe() to stop subscrition to store changes;

fetchLocation();
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
