import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './PokemonCard.module.css'

export default function PokemonCard({name, image, types}) {
  return (
    <Card style={{ width: '12rem', color: "black" }} className={styles.pokeCard}>
      <Card.Img variant="top" src={image} />
      <Card.Body className={styles.pokemonCardBody}>
        <Card.Title className={styles.pokemonCardName}>{name}</Card.Title>
        <Card.Text className={styles.typeWrapper}>
            Type:
            {types.map((type, key) => (
            <span key={key}>
                {key >= 1 ? (<span> | </span>) : ''}
                {' '}{types[key].type.name}
            </span>
            ))}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}