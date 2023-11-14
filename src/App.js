// App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGeneration, setPokemonList, setGamesList } from './PokemonList';

function App() {
  const dispatch = useDispatch();
  const generation = useSelector((state) => state.generation);
  const pokemonList = useSelector((state) => state.pokemonList);
  const gamesList = useSelector((state) => state.gamesList);

  useEffect(() => {
    // Fetch generations list
    const fetchGenerations = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/generation');
        const data = await response.json();
        const generations = data.results;
        // Dispatch action to set generations list
        // You may need to extract the generation number from the URL
        dispatch(setGamesList(generations));
      } catch (error) {
        console.error('Error fetching generations', error);
      }
    };

    fetchGenerations();
  }, [dispatch]);

  useEffect(() => {
    // Fetch Pokémon and games data based on the selected generation
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
        const data = await response.json();

        // Extract Pokémon and games data from the response
        const pokemonData = data.pokemon_species;
        const gameData = data.version_groups;

        // Dispatch actions to set Pokémon and games lists
        dispatch(setPokemonList(pokemonData));
        dispatch(setGamesList(gameData));
      } catch (error) {
        console.error(`Error fetching data for generation ${generation}`, error);
      }
    };

    // Call the fetchPokemonData function only if gamesList is defined
    if (gamesList) {
      fetchPokemonData();
    }
  }, [generation, gamesList, dispatch]);

  return (
    <div>
      <select onChange={(e) => dispatch(setGeneration(e.target.value))}>
        {gamesList && gamesList.map((gen) => (
          <option key={gen.name} value={gen.name}>
            {gen.name}
          </option>
        ))}
      </select>

      <div>
        {/* Display Pokémon list */}
        {pokemonList && pokemonList.map((pokemon) => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))}
      </div>

      <div>
        {/* Display games associated with the selected generation */}
        {gamesList && gamesList.map((game) => (
          <div key={game.name}>{game.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;