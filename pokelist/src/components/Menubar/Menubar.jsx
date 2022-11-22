import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useContext } from 'react';

// Styles
import styles from './Menubar.module.css';
import { MagnifyingGlass } from "phosphor-react";
import FavoriteContext from '../../contexts/FavoritesContext';

export default function Menubar({searchFilter}) {

  const {favoritePokemons} = useContext(FavoriteContext)

  return (
    <div className={styles.Menubar}>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className={styles.navbar}>
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                alt="pokeball"
                src="https://cdn-icons-png.flaticon.com/512/1427/1427643.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              <span className={styles.poketitle}>Pokélist</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} 
              className={styles.navbarToggle}
            />
            <Navbar.Offcanvas 
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className={styles.offcanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    alt="pokeball"
                    src="https://cdn-icons-png.flaticon.com/512/1427/1427643.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  <span className={styles.poketitle}>Pokélist</span>
                </Offcanvas.Title>
                <div>
                  🤍 {favoritePokemons.length}
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                </Nav>
                <Form className={styles.searchBox}>
                  <Form.Control
                    type="search"
                    placeholder="Pokésearch"
                    className="SearchInput"
                    aria-label="Search"
                    onChange={(e) => searchFilter(e.target.value)}
                  />
                  <Button variant="outline-white" className={styles.searchButton} onClick={() => searchFilter('')}> <MagnifyingGlass size={32} /> </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}
