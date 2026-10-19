
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPajama, deletePajama } from '../services/PajamasAPI'
import '../App.css'

const PajamaDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [pajama, setPajama] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPajama = async () => {
            try {
                const data = await getPajama(id)
                setPajama(data)
            } catch (error) {
                console.error('Error fetching pajama:', error)
                setError('Unable to load pajama details.')
            } finally {
                setLoading(false)
            }
        }

        fetchPajama()
    }, [id])

    const handleDelete = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this pajama set?'
        )

        if (!confirmed) return

        try {
            await deletePajama(id)
            navigate('/custompajamas')
        } catch (error) {
            console.error('Error deleting pajama:', error)
            setError('Unable to delete pajama set.')
        }
    }

    if (loading) return <p>Loading pajama details...</p>
    if (error) return <p role="alert">{error}</p>
    if (!pajama) return <p>Pajama set not found.</p>

    return (
        <div className="pajama-container">
            <h1>{pajama.name}</h1>

            <p>Fabric: {pajama.fabric}</p>
            <p>Color: {pajama.color}</p>
            <p>Sleeve Style: {pajama.sleeve_style}</p>
            <p>Pant Style: {pajama.pant_style}</p>
            <p>Price: ${pajama.price}</p>

            <Link to={`/edit/${pajama.id}`}>
                Edit Pajama
            </Link>

            <button onClick={handleDelete}>
                Delete Pajama
            </button>

            <Link to="/custompajamas">
                Back to My Pajamas
            </Link>
        </div>
    )
}

export default PajamaDetails




// import React from 'react'
// import '../App.css'
// import { useEffect, useState } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { getPajama, deletePajama } from '../services/PajamasAPI'

// const CarDetails = () => {

//     const { id } = useParams()
//     const navigate = useNavigate()
//     const [car, setCar] = useState(null)

//     useEffect(() => {
//         const fetchPajama = async () => {
//         const data = await getPajama(id)
//         setCar(data)
//         }

//         fetchPajama()
//     }, [id])

//     const handleDelete = async () => {
//         await deletePajama(id)
//         navigate('/pajamas')
//     }

//     if (!car) return <p>Loading...</p>


//     return (
//         <div>

//             <h1>{car.name}</h1>
//             <p>Color: {car.color}</p>
//             <Link to={`/edit/${id}`}>Edit Pajama</Link>
//             <button onClick={handleDelete}>Delete Pajama</button>
//             navigate('/pajamas')

//         </div>
//     )
// }

// export default CarDetails