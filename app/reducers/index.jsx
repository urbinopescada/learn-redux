
export var nameReducer = (state='Anonymous', action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return action.name
    default:
      return state;
  }
};

var nextHobbyId = 1;
export var hobbiesReducer = (state=[], action) => {
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

var nextMovieId = 1;
export var moviesReducer = (state=[], action) => {
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

export const mapReducer = (state={isFechting:false, url: null}, action)=>{
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
