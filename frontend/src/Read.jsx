import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Read() {
    // Ici, vous pouvez utiliser l'ID pour récupérer les détails de l'étudiant à partir de votre API
    // Par exemple, vous pouvez utiliser axios pour faire une requête GET 
    const {id} = useParams();

    const [student, setStudent] = useState({})
    
    
 
     useEffect(() => {
        axios.get('http://localhost:8080/read/ '+id)
        .then(res =>  {
            console.log(res)
            setStudent(res.data[0]);
        })
        .catch(err => console.log(err))
    }
    , [id])
 
  return (
    <div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
        <div className='w-50 bg-white rounded shadow p-3'>
            <h3>Détails de l'Etudiant</h3>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                    </tr>
                </tbody>
                
            </table>
            <Link to={`/update/${student.id}`} className='btn btn-warning me-2' >Modifier</Link>
            <Link to='/' className='btn btn-success'>Retour</Link>
        </div>
    </div>
    )
}

export default Read