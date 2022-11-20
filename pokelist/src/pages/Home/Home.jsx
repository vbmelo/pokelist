import { useState, useEffect } from 'react'
import axios from "axios";

// Styles
import styles from './Home.module.css'

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Menubar from '/src/components/Menubar/Menubar.jsx'
import PokemonCard from '/src/components/PokemonCard/PokemonCard.jsx'

export default function Home() {
    const [count, setCount] = useState(0);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons();
    }, [])

    // Receive data from the API
    const getPokemons = () => {
        // Quantity of pokemons we want to display
        let pokemonQuantity = 66

        // Endpoint arrays
        var endpoints = []

        // For every pokemon detailed api endpoint(url), we will store it
        // in the endpoints array, so that we can retreive more info
        // such as image
        for ( var i = 1; i <= pokemonQuantity; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)).catch((err) => console.log(err));
    }

    //Filtering the inputted search
    const searchFilter = (name) => {
        name = name.toLowerCase()
        // filteredPokemons stores the pokemons that matches the text in search's input area
        var filteredPokemons = []
        if(name==='') {
            getPokemons()
        }
        // for every pokemon stored in the array returned by the pokeAPI
        // it searches if inputted text is the same as a pokemon in the array
        for (var i in pokemons) {
            if(pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i]);
            }
        }
        // Only display the search results
        setPokemons(filteredPokemons)
    }
 

    return (
        <div className={styles.home}>
            <Menubar searchFilter={searchFilter}/>
            <Container className='pokeCardContainer align-items-center justify-content-center'>
                <Row>
                    {   
                        pokemons.map((pokemon, key) => (
                            <Col className='d-flex mb-4 m-0' key={key}>
                                <PokemonCard 
                                    name={pokemon.data.name} 
                                    image={pokemon.data.sprites.front_default}
                                    types={pokemon.data.types}
                                />
                            </Col>)
                    )}
                </Row>
            </Container>
        </div>
    )
}
