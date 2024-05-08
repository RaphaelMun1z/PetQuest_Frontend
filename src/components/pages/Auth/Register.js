import { useContext, useState } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.scss'

// Contexts
import { Context } from '../../../context/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        // Enviar o Usuário para o banco
        register(user)
    }

    return (
        <section className={styles.formSection}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input text='Nome' type='text' name='name' placeholder='Digite seu nome' handleOnChange={handleChange} />
                <Input text='Telefone' type='text' name='phone' placeholder='Digite seu telefone' handleOnChange={handleChange} />
                <Input text='E-mail' type='email' name='email' placeholder='Digite seu e-mail' handleOnChange={handleChange} />
                <Input text='Senha' type='password' name='password' placeholder='Digite sua senha' handleOnChange={handleChange} />
                <Input text='Confirmação de senha' type='password' name='confirmpassword' placeholder='Confirme sua senha' handleOnChange={handleChange} />
                <input type='submit' value='Cadastrar' />
            </form>
            <p>
                Já possui uma conta? <Link to='/login'>Acessar minha conta</Link>
            </p>
        </section>
    )
}

export default Register