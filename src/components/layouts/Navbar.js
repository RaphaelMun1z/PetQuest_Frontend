import { Link } from 'react-router-dom'
import { useContext } from 'react'

import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo.png'

// Context
import { Context } from '../../context/UserContext'

function Navbar() {
    const { authenticated, logout } = useContext(Context)

    return (
        <nav>
            <div className={styles.logoContainer}>
                <img src={Logo} alt='Get A Pet' />
                <h2>PetQuest</h2>
            </div>
            <ul>
                <li>
                    <Link to="/" className={styles.link}>Adotar</Link>
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/pet/myadoptions" className={`${styles.link}`}>Minhas doações</Link>
                        </li>
                        <li>
                            <Link to="/pet/mypets" className={`${styles.link}`}>Meus Pets</Link>
                        </li>
                        <li>
                            <Link to="/user/profile" className={`${styles.link}`}>Perfil</Link>
                        </li>
                        <li onClick={logout} className={`${styles.link} ${styles.logout}`}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register" className={styles.link}>Cadastrar</Link>
                        </li>
                        <li>
                            <Link to="/login" className={`${styles.link} ${styles.login}`}>Entrar</Link>
                        </li>
                    </>
                )
                }
            </ul>
        </nav>
    )
}

export default Navbar