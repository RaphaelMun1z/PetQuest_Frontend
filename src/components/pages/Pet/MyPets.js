import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../layouts/RoundedImage'

import styles from './Dashboard.module.scss'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    async function removePet(id) {
        let msgtype = 'success'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPets(updatedPets)
            return response.data
        }).catch((err) => {
            msgtype = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgtype)
    }

    async function concludeAdoption(id) {
        let msgtype = 'success'

        const data = await api.patch(`/pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgtype = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgtype)
    }

    return (
        <section className={styles.petsSection}>
            <div className={styles.header}>
                <h1>Meus Pets</h1>
                <Link to='/pet/add'>Cadastrar Pet</Link>
            </div>
            <div className={styles.petsContainer}>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div key={pet._id} className={styles.card}>
                            <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="75px" />
                            <h3>{pet.name}</h3>
                            <div className={styles.action}>
                                {pet.available ? (
                                    <>
                                        <Link to={`/pet/edit/${pet._id}`} className={styles.edit}>Editar</Link>
                                        <button onClick={() => {
                                            removePet(pet._id)
                                        }} className={styles.delete}>Excluir</button>
                                        {pet.adopter && (
                                            <button onClick={() => {
                                                concludeAdoption(pet._id)
                                            }} className={styles.conclude}>Concluir adoção</button>
                                        )}
                                    </>
                                ) : (
                                    <p>Este Pet já foi adotado!</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Não há Pets cadastrados.</p>
                )}
            </div>
        </section>
    )
}

export default MyPets