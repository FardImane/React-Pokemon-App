// reducers.js

const initialState = {
    selectedGeneration: null,
    selectedPokemon: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_GENERATION':
        return {
          ...state,
          selectedGeneration: action.payload,
        };
      case 'SELECT_POKEMON':
        return {
          ...state,
          selectedPokemon: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  