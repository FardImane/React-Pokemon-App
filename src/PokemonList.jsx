import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenerations, setSelectedGeneration, setPokemonList, setGenerationDetails } from './actions';

const PokemonList = () => {
    const dispatch = useDispatch();
    const generations = useSelector((state) => state.generations);
    const selectedGeneration = useSelector((state) => state.selectedGeneration);
    const generationDetails = useSelector((state) => state.generationDetails);

    const [speciesList, setSpeciesList] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/generation/', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => dispatch(setGenerations(data.results)))
            .catch(error => console.error('Error fetching generations:', error));
    }, [dispatch]);

    useEffect(() => {
        const fetchGenerationDetails = async () => {
            if (selectedGeneration) {
                try {
                    const response = await fetch(
                        `https://pokeapi.co/api/v2/generation/${selectedGeneration.toLowerCase()}/`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const data = await response.json();
                    dispatch(setPokemonList(data.pokemon_species.map(pokemon => pokemon.name)));
                    dispatch(setGenerationDetails(data));
                    setSpeciesList(data.pokemon_species);
                } catch (error) {
                    console.error(`Error fetching details for ${selectedGeneration} generation:`, error);
                }
            }
        };

        fetchGenerationDetails();
    }, [selectedGeneration, dispatch]);

    const handleGenerationChange = (event) => {
        dispatch(setSelectedGeneration(event.target.value));
    };

    return (
        <div>
            <center>
                <h1>Pokemon List</h1>
                <label htmlFor="generationSelect">Select a Generation:</label>
                <select id="generationSelect" onChange={handleGenerationChange} value={selectedGeneration}>
                    <option value="">Select Generation</option>
                    {generations && generations.map(generation => (
                        <option key={generation.name} value={generation.name}>
                            {generation.name}
                        </option>
                    ))}

                </select>
                {selectedGeneration && (
                    <div>
                        <h2>{selectedGeneration}</h2>
                        {generationDetails && (
                            <div>
                                <h3>Generation Details:</h3>
                                <p>Main Region: {generationDetails.main_region.name}</p>
                                <p>Names: {generationDetails.names[0].name}</p>
                                <h3>Species:</h3>
                                <ul>
                                    {speciesList.map(species => (
                                        <li key={species.name}>{species.name}</li>
                                    ))}
                                </ul>
                                <h3>Version Groups:</h3>
                                <ul>
                                    {generationDetails.version_groups.map(versionGroup => (
                                        <li key={versionGroup.name}>{versionGroup.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </center>
        </div>
    );
};

export default PokemonList;