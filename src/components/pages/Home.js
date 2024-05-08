import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Home.module.scss'

import RoundedImage from '../layouts/RoundedImage'

function Home() {
    const [pets, setPets] = useState({})

    useEffect(() => {
        api.get('/pets').then((response) => [
            setPets(response.data.pets)
        ])
    }, [])

    return (
        <section className={styles.petsSection}>
            <div className={styles.header}>
                <h1>Adote um Pet</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className={styles.petsContainer}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div key={pet._id} className={`${styles.card} ${!pet.available ? styles.adopted : ''}`}>
                            <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="75px" />
                            <h3>{pet.name}</h3>
                            <h5>{pet.weight}kg</h5>
                            {pet.available ? (
                                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
                            ) : (
                                <p>Adotado.</p>
                            )
                            }
                        </div>
                    ))}
                {pets.length === 0 && (
                    <p>Não há Pets cadastrados ou disponíveis para adoção no momento!</p>
                )}
            </div>
        </section>
    )
}

export default Home