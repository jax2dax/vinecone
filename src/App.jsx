import { useState } from 'react'
import './App.css'

import Inputbox from './Inputbox.jsx'
import Response from './Response.jsx'
import Headers from './Headers.jsx'
import { scaleSaved, resultSaved } from './brain.js';
import Nav  from './Nav.jsx'
import Visuals from './Visuals.jsx';



function App() {
  

  return (
  <>
    <Nav />
  <div className='operationbox'>
    <Headers /> 
    <span className='span2'>Type in the field below </span>
   <Inputbox /> {/* changed */}
    
    <Response responseDisplay={resultSaved} />
    </div>
    <Visuals />
  </>
  )
}

export default App
