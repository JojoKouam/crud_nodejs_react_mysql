import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';


function Update() {
    // Ici, vous pouvez utiliser l'ID pour récupérer les détails de l'étudiant à partir de votre API
    const [values, setValues] = useState({
        name: '',
        email: ''
    })
    
    const navigate = useNavigate()
    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:8080/read/ '+id)
        .then(res =>  {
            console.log(res)
            setValues(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [id])
    const handleSubmit = (e) => {
        axios.put('http://localhost:8080/update/'+id, values)
        .then(res => {
            console.log(res.data)
            alert('Etudiant mis à jour avec succès')
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            alert('Erreur lors de la mise à jour de l\'étudiant')
        }
        )
        e.preventDefault()
    }
  return (
    <div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
        <div className='w-50 bg-white rounded shadow p-3'>
            <h3>Modifier un Etudiant</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className='form-label'>Nom</label>
                    <input type="text" placeholder='Entrer le nom' className='form-control' id="name" required
                    value={values.name}
                    onChange={e => setValues({...values, name: e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"  className='form-label'>Email</label>
                    <input type="email" placeholder='Entrer Email' className='form-control' id="email" required
                    value={values.email}
                    onChange={e => setValues({...values, email: e.target.value})}/>
                </div>
                <button type="submit" className='btn btn-success'>Modifier</button>
            </form>
        </div>
    </div>
  )
}

export default Update