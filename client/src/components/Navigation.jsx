import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Pajama Builder</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize Pajamas</a></li>
                <li><a href='/custompajamas' role='button'>View Pajamas</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation