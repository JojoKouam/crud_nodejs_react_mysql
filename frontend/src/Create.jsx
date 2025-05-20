import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        axios.post('http://localhost:8080/student', values)
        .then(res => {
            console.log(res.data)
            alert('Etudiant créé avec succès')
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            alert('Erreur lors de la création de l\'étudiant')
        }
        )
        e.preventDefault()
    }
  return (
    <div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
        <div className='w-50 bg-white rounded shadow p-3'>
            <h3>Créer un Etudiant</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className='form-label'>Nom</label>
                    <input type="text" placeholder='Entrer le nom' className='form-control' id="name" required
                    onChange={e => setValues({...values, name: e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"  className='form-label'>Email</label>
                    <input type="email" placeholder='Entrer Email' className='form-control' id="email" required
                    onChange={e => setValues({...values, email: e.target.value})}/>
                </div>
                <button type="submit" className='btn btn-success'>Créer</button>
            </form>
        </div>
    </div>
  )
}

export default Create