import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PokemonDetailsModal from '../PokemonDetailsModal/PokemonDetailsModal';

import styles from './PokemonCard.module.css'

export default function PokemonCard(props) {
  const onHeartClick = () => {
    console.log("Adding to Favorites")
  }
  const heart = "🤍"
  
  return (
    <Card style={{ width: '12rem', color: "black" }} className={styles.pokeCard}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body className={styles.pokemonCardBody}>
        <Card.Title className={styles.pokemonCardName}>{props.name}</Card.Title>
        <Card.Text className={styles.typeWrapper}>
            <Card.Title className={styles.pokemonTypeTitle}>Type:</Card.Title>
            {props.types.map((type, key) => (
            <span key={key}>
                {' '}{props.types[key].type.name}
            </span>
            ))}
            <Button
              className={styles.pokemonHeartBtn}
              onClick={onHeartClick}
            >
              {heart}
            </Button>
        </Card.Text>
      </Card.Body>
      {/* <PokemonDetailsModal
          {...props}
      /> */}
    </Card>
  );
}