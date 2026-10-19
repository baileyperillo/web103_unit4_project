
import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { getAllPajamas } from '../services/PajamasAPI'

const ViewPajamas = () => {
    const [pajamas, setPajamas] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPajamas = async () => {
            try {
                const data = await getAllPajamas()
                setPajamas(data)
            } catch (error) {
                console.error('Error fetching pajamas:', error)
                setError('Unable to load pajama sets.')
            }
        }

        fetchPajamas()
    }, [])

    return (
        <div className="pajama-container">
            <h1>My Pajama Sets</h1>

            <Link to="/">Create a Pajama Set</Link>

            {error && <p role="alert">{error}</p>}

            {!error && pajamas.length === 0 && (
                <p>No pajama sets created yet.</p>
            )}

            {pajamas.map((pajama) => (
                <div key={pajama.id}>
                    <h2>{pajama.name}</h2>
                    <p>Fabric: {pajama.fabric}</p>
                    <p>Color: {pajama.color}</p>
                    <p>Sleeve Style: {pajama.sleeve_style}</p>
                    <p>Pant Style: {pajama.pant_style}</p>
                    <p>Price: ${pajama.price}</p>

                    <Link to={`/custompajamas/${pajama.id}`}>
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ViewPajamas
