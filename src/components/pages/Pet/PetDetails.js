import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './PetDetails.module.scss'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails() {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    async function schedule() {
        let msgType = 'success'

        console.log("Log aqui")

        const data = await api.patch(`pets/schedule/${pet._id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <>
            {pet.name && (
                <section className={`${styles.petFormSection}`}>
                    <div className={styles.header}>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.imagesContainer}>
                            {pet.images.map((image, index) => (
                                <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={index} />
                            ))}
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoTitle}>Peso:</p>
                            <p>{pet.weight}kg</p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoTitle}>Idade:</p>
                            <p>{pet.age}</p>
                        </div>
                        {token ? (
                            <button className={styles.button}
                                onClick={schedule}>Solicitar uma visita
                            </button>
                        ) : (
                            <p className={styles.noAccountMsg}>Você precisa <Link to="/register">criar uma conta</Link> para solicitar uma visita.</p>
                        )}
                    </div>

                </section>
            )}
        </>
    )
}

export default PetDetails