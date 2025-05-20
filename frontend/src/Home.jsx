
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    const [data, setData]= useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
        <div className='w-50 bg-white rounded shadow p-3'>
            <h3>Liste des Etudiants</h3>
            <div className='d-flex justify-content-end'>
                <Link to='/create' className='btn btn-success'>Créer +</Link>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th> 
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student, index) => {
                    return <tr key={student.id ||index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <Link to= {`/read/${student.id}`}className='btn btn-sm btn-info'>Afficher</Link>
                                <Link to={`/update/${student.id}`} className='btn btn-sm btn-warning mx-2'>Modifier</Link>
                                <Link to={`/delete/${student.id}`} className='btn btn-sm btn-danger'>Supprimer</Link>
                            </td>
                        </tr>
                    }
                )}
                </tbody>

            </table>
        </div>
    </div>
  )
}
export default Home
