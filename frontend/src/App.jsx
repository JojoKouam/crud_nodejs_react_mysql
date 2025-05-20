import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
import Read from './Read'
import Update from './Update'
import Delete from './Delete'

function App() {

  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element= {<Home />} />
        <Route path="/create" element= {<Create/>} />
        <Route path="/read/:id" element= {<Read/>} />
        <Route path="/update/:id" element= {<Update/>} />
        <Route path="/delete/:id" element= {<Delete/>} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
