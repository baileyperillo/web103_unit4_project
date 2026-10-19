
import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { getAllPajamas, deletePajama } from '../services/PajamasAPI'
import FabricPreview from '../components/FabricPreview'

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

    // Delete a saved pajama set
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this pajama set?'
        )

        if (!confirmed) return

        try {
            await deletePajama(id)

            // Remove the deleted set from the page
            setPajamas((prev) =>
                prev.filter((pajama) => pajama.id !== id)
            )
        } catch (error) {
            console.error('Error deleting pajama:', error)
            setError('Unable to delete pajama set.')
        }
    }

    return (
        <div className="pajama-container">
            <h1>My Pajama Sets</h1>

            <Link to="/">Create a Pajama Set</Link>

            {error && <p role="alert">{error}</p>}

            {!error && pajamas.length === 0 && (
                <p>No pajama sets created yet.</p>
            )}

            {pajamas.map((pajama) => (
                <div key={pajama.id} className="pajama-card">
                    <h2>{pajama.name}</h2>

                    <FabricPreview color={pajama.color} />

                    <p>Fabric: {pajama.fabric}</p>
                    <p>Color: {pajama.color}</p>
                    <p>Sleeve Style: {pajama.sleeve_style}</p>
                    <p>Pant Style: {pajama.pant_style}</p>
                    <p>Price: ${Number(pajama.price).toFixed(2)}</p>

                    <div className="pajama-actions">
                        <Link to={`/custompajamas/${pajama.id}`}>
                            View Details
                        </Link>

                        <Link to={`/edit/${pajama.id}`}>
                            Edit
                        </Link>

                        <button
                            type="button"
                            onClick={() => handleDelete(pajama.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewPajamas

