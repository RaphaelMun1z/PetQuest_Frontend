import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.scss'

import RoundedImage from '../../layouts/RoundedImage'

function MyAdoptions() {
    const [pets, setPets] = useState({})
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    return (
        <section className={styles.petsSection}>
            <div className={styles.header}>
                <h1>Minhas doações</h1>
            </div>
            <div className={styles.petsContainer}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div key={pet._id} className={`${styles.card} ${!pet.available ? styles.adopted : ''}`}>
                            <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="75px" />
                            <h3>{pet.name}</h3>
                            <div className={styles.info}>
                                <p className={styles.infoTitle}>Ligue para:</p>
                                <p>{pet.user.phone}</p>
                            </div>
                            <div className={styles.info}>
                                <p className={styles.infoTitle}>Fale com:</p>
                                <p>{pet.user.name}</p>
                            </div>
                            <div className={styles.action}>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Parabéns por concluir a adoção!</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Ainda não foi realizada uma adoção de pet.</p>}
            </div>
        </section>
    )
}

export default MyAdoptions
