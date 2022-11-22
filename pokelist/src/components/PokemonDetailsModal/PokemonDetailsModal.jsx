import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

import styles from '/src/components/PokemonDetailsModal/PokemonDetailsModal.module.css'

export default function PokemonDetailsModal(props) {
    const onHeartClick = () => {
    console.log("Adding to Favorites")
    }
    const heart = "🤍"
  return (
    <div >
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={styles.pokemonModal}
        >
            <Modal.Header closeButton>
                <img src={props.image} className={styles.modalImage}/>
                <Modal.Title id="contained-modal-title-vcenter" className={styles.modalTitlePokemon}>
                    Name: {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>
                        Id:{' '}
                        <span>
                            #{props.id}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Type:
                        {props.types.map((type, key) => (
                        <span key={key}>
                            {' '}{props.types[key].type.name}
                        </span>
                        ))}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Height:{' '}
                        <span>
                            {props.height}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Base Experience: {' '}
                        <span>
                            {props.base_experience}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Forms:
                        {props.forms.map((form, key) => (
                        <span key={key}>
                            {' '}{props.forms[key].name}
                        </span>
                        ))}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        abilities:
                        {props.abilities.map((ability, key) => (
                        <span key={key}>
                            {' '}{props.abilities[key].ability.name}
                            {props.abilities[key] > 0 ? ' | ' : ' ' }
                            {' | '}
                        </span>
                        ))}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="1">
                        <Accordion.Header>Moves</Accordion.Header>
                            {props.moves.map((move, key) => (
                                <Accordion.Body key={key}>
                                    {' '}{props.moves[key].move.name}
                                    {' | '}
                                </Accordion.Body>
                            ))}
                        </Accordion.Item>
                        </Accordion>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button
                className={styles.pokemonHeartBtn}
                onClick={onHeartClick}
                >
                {heart}
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}
