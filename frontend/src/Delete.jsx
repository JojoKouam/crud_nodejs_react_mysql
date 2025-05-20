import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useEffect } from 'react';

function Delete() {
    // Ici, vous pouvez utiliser l'ID pour supprimer l'étudiant à partir de votre API
    // Par exemple, vous pouvez utiliser axios pour faire une requête DELETE
    const {id} = useParams();
        const navigate = useNavigate()
    
    const handleDelete = () => {
        axios.delete('http://localhost:8080/delete/ '+id)
        .then(res =>  {
            console.log(res)
            alert('Etudiant supprimé avec succès')
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
            <div className='w-50 bg-white rounded shadow p-3'>
                <h3>Supprimer un Etudiant</h3>
                <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
                <button onClick={handleDelete} className='btn btn-danger'>Supprimer</button>
                <Link to='/' className='btn btn-success'>Retour</Link>
            </div>
        </div>
    )

}

export default Delete