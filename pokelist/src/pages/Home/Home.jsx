import { useState, useEffect } from "react";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

// Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Menubar from "/src/components/Menubar/Menubar.jsx";
import PokemonCard from "/src/components/PokemonCard/PokemonCard.jsx";
import PaginationModule from "../../components/Pagination/PaginationModule";
import PokemonDetailsModal from "../../components/PokemonDetailsModal/PokemonDetailsModal";

import FavoriteProvider from "../../contexts/FavoritesContext";

export default function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(100);
    const [offset, setOffset] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [index, setIndex] = useState(0);
    const [totalPages,setTotalPages] = useState(12);

    //Handling the details modal
    const [show, setShow] = useState(false);

    let itemsPerPage = 100;
    

    useEffect(() => {
        getPokemons();
    }, [page]);

    // Receive data from the API
    const getPokemons = () => {
        // Quantity of pokemons we want to display
        // is displayed by pokemonsPerPage

        // Endpoint arrays
        var endpoints = [];

        // For every pokemon detailed api endpoint(url), we will store it
        // in the endpoints array, so that we can retreive more info
        // such as image
        for (var i = offset + 1; i <= pokemonsPerPage; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => setPokemons(res))
            .catch((err) => console.log(err));
    };

    //Filtering the inputted search
    const searchFilter = (name) => {
        name = name.toLowerCase();
        // filteredPokemons stores the pokemons that matches the text in search's input area
        var filteredPokemons = [];
        if (name === "") {
            getPokemons();
        }
        // for every pokemon stored in the array returned by the pokeAPI
        // it searches if inputted text is the same as a pokemon in the array
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i]);
            }
        }
        // Only display the search results
        setPokemons(filteredPokemons);
    };

    // Pagination
    const onLeftClickHandler = () => {
        if (page + 1 > 0) {
            setOffset(pokemonsPerPage);
            setPokemons([])
            setPage(page - 1);
            setPokemonsPerPage(pokemonsPerPage - itemsPerPage)
            getPokemons()
        }
        console.log("Voltando a Pagina");
    };

    const onRightClickHandler = () => {
        if (page + 1 !== totalPages) {
            setOffset(pokemonsPerPage);
            setPokemons([])
            setPage(page + 1);
            setPokemonsPerPage(pokemonsPerPage + itemsPerPage)
            getPokemons()
        }
        console.log("Avancando a Pagina");
    };

    //Handling Favorites
    const updateFavoritePokemons = (name) => {
        const updatedFavorites = { ...favorites }
        const favoriteIndex = favorites.indexOf(name)
        if (favoriteIndex >= 0) {
            updatedFavorites.slice(favoriteIndex, 1);
        } else {
            updatedFavorites.push(favoriteIndex, 1);
        }
        setFavorites(updatedFavorites);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleModalShow = (key) => {
        setIndex(key);
        console.log("mostrar modal", key);
        handleShow();
    }

    return (
        // <FavoriteProvider value={{
        //     favoritePokemons: favorites, 
        //     updateFavoritePokemons: updateFavoritePokemons
        // }}>
        <div className={styles.home}>
            <Menubar searchFilter={searchFilter} />
            <PaginationModule
                page={page + 1}
                totalPages={totalPages}
                onLeftClick={onLeftClickHandler}
                onRightClick={onRightClickHandler}
            />
            <Container className="pokeCardContainer align-items-center justify-content-center">
                <Row>
                    {pokemons.map((pokemon, key) => (
                        <>
                            <Col className="d-flex mb-4 m-0" key={key}>
                                <span onClick={() => handleModalShow(key)}>
                                    <PokemonCard
                                        key ={key}
                                        id={pokemon.data.id}
                                        name={pokemon.data.name}
                                        image={pokemon.data.sprites.front_default}
                                        types={pokemon.data.types}
                                    />
                                </span>
                            </Col>
                        </>
                    ))}
                </Row>
                {show ? (
                    <PokemonDetailsModal
                    name={pokemons[index].data.name}
                    image={pokemons[index].data.sprites.front_default}
                    types={pokemons[index].data.types}
                    show={show} 
                    onHide={handleClose}
                    height={pokemons[index].data.height}
                    base_experience={pokemons[index].data.base_experience}
                    forms={pokemons[index].data.forms}
                    id={pokemons[index].data.id}
                    abilities={pokemons[index].data.abilities}
                    moves={pokemons[index].data.moves}
                    />
                ) : ('')}
                
            </Container>
        </div>
        // </FavoriteProvider>
    );
}
