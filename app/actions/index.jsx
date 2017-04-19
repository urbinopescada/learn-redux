var axios = require('axios');

export var changeName = (name)=>{
  return {
    type: "CHANGE_NAME",
    name //ES6 feature: equivalent to 'name: name'
  }
};

export var addHobbie = (hobby) =>{
    return {
      type: "ADD_HOBBIE",
      hobby
    };
};

export var removeHobbie = (id) =>{
    return {
      type: "REMOVE_HOBBIE",
      id
    };
};

export var addMovie = (movie,genre) =>{
    return {
      type: "ADD_MOVIE",
      movie,
      genre
    };
};

export var removeMovie = (id) =>{
    return {
      type: "REMOVE_MOVIE",
      id
    };
};

export var startLocationFetch = () =>{
    return {
      type: "START_LOCATION_FETCH"
    };
};

export var completeLocationFech = (url) =>{
    return {
      type: "COMPLETE_LOCATION_FETCH",
      url
    };
};

export var fetchLocation = () =>{
  return (dispatch, getState) =>{
    dispatch(startLocationFetch());
    axios.get('http://ipinfo.io').then((res)=>{
      var loc = res.data.loc;
      var url = "http://maps.google.com?q=" +loc + "&output=embed";
      dispatch(completeLocationFech(url));
    });
  };
};
