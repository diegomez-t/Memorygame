import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
  const deck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ];

  const [selected, setSelected] = useState([]);
  const [cards, setCards] = useState(deck)
  const [flipped, setFlipped] = useState([]);
 
  
  function echange(array) {
    const arr = [...array]; 
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Échange des éléments
    }
    return arr
  }
  useEffect(()=>{
    setCards(echange(cards))
  },[])

  useEffect(() => {
    // Réinitialiser le jeu si toutes les cartes sont appariées
    if (selected.length === deck.length) {
      setTimeout(() => {
        setSelected([]);
        setCards(echange(deck));
        setFlipped([]);
      }, 1000);
    }
  }, [selected]);
  
  const selectCard = (id) => {
    // Empêche de retourner plus de 2 cartes ou de retourner une carte déjà appariée
    if (flipped.length === 2) 
      return;

    setFlipped((prevFlipped) => {
      const updatedFlipped = [...prevFlipped, id];

      if (updatedFlipped.length === 2) {
        // Vérifie la correspondance entre les deux cartes
        const [firstId, secondId] = updatedFlipped;
        const firstCard = cards.find(card => card.id === firstId);
        const secondCard = cards.find(card => card.id === secondId);

        if (firstCard.name === secondCard.name) {
          // Si elles correspondent, on les ajoute aux cartes appariées
          setSelected([...selected, firstId, secondId]);
          setFlipped([]); // Réinitialise les cartes retournées
        } else {
          // Si elles ne correspondent pas, on les retourne après un délai
          setTimeout(() => {
            setFlipped([]); // Réinitialise les cartes retournées
          }, 500);
        }
      }

      return updatedFlipped;
    });
  };
  

  const cardsToDisplay = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={flipped.includes(card.id) || selected.includes(card.id)} // La carte est "retournée" si elle est dans flipped
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
