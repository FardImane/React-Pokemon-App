import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    generations: [],
    selectedGeneration: '',
    pokemonList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GENERATIONS':
            return { ...state, generations: action.payload };
        case 'SET_SELECTED_GENERATION':
            return { ...state, selectedGeneration: action.payload };
        case 'SET_POKEMON_LIST':
            return { ...state, pokemonList: action.payload };
        case 'SET_GENERATION_DETAILS':
            return {
                ...state,
                generationDetails: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;