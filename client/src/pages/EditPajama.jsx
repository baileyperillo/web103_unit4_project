
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPajama, updatePajama } from '../services/PajamasAPI'
import '../App.css'

const EditPajama = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [pajama, setPajama] = useState({
        name: '',
        fabric: '',
        color: '',
        sleeve_style: '',
        pant_style: ''
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    // Retrieve the existing pajama set
    useEffect(() => {
        const fetchPajama = async () => {
            try {
                const data = await getPajama(id)
                setPajama(data)
            } catch (error) {
                console.error('Error fetching pajama:', error)
                setError('Unable to load pajama set.')
            } finally {
                setLoading(false)
            }
        }

        fetchPajama()
    }, [id])

    // Update the field that the user changes
    const handleChange = (e) => {
        const { name, value } = e.target

        setPajama((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Save the updated pajama set
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)

        try {
            await updatePajama(id, pajama)
            navigate(`/custompajamas/${id}`)
        } catch (error) {
            console.error('Error updating pajama:', error)
            setError('Unable to save changes.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <p>Loading pajama set...</p>

    if (error && !pajama.id) {
        return <p role="alert">{error}</p>
    }

    return (
        <div className="pajama-container">
            <h1>Edit Your Pajama Set</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Pajama Set Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={pajama.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="fabric">Fabric Type</label>
                <select
                    id="fabric"
                    name="fabric"
                    value={pajama.fabric}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Fabric</option>
                    <option value="Cotton Jersey">Cotton Jersey</option>
                    <option value="Silk">Silk</option>
                    <option value="Cotton Flannel">Cotton Flannel</option>
                    <option value="Cotton Poplin">Cotton Poplin</option>
                </select>

                <label htmlFor="color">Color</label>
                <select
                    id="color"
                    name="color"
                    value={pajama.color}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Pink">Pink</option>
                    <option value="Red">Red</option>
                </select>

                <label htmlFor="sleeve_style">Sleeve Style</label>
                <select
                    id="sleeve_style"
                    name="sleeve_style"
                    value={pajama.sleeve_style}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Sleeve Style</option>
                    <option value="Long Loose">Long Loose</option>
                    <option value="Elbow Loose">Elbow Loose</option>
                    <option value="Long Tight">Long Tight</option>
                    <option value="Short Loose">Short Loose</option>
                </select>

                <label htmlFor="pant_style">Pant Style</label>
                <select
                    id="pant_style"
                    name="pant_style"
                    value={pajama.pant_style}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Pant Style</option>
                    <option value="Long">Long</option>
                    <option value="Knee Length">Knee Length</option>
                    <option value="Short Shorts">Short Shorts</option>
                </select>

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>

            <Link to={`/custompajamas/${id}`}>
                Cancel
            </Link>
        </div>
    )
}

export default EditPajama






// import React from 'react'
// import '../App.css'
// import { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { getPajama, updatePajama } from '../services/PajamasAPI'


// const EditCar = () => {

//     const { id } = useParams()
//     const navigate = useNavigate()

//     const [name, setName] = useState('')
//     const [color, setColor] = useState('')

//     useEffect(() => {
//         const fetchPajama = async () => {
//         const pajama = await getPajama(id)
//         setName(pajama.name)
//         setColor(pajama.color)
//         }

//         fetchPajama()
//     }, [id])

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         await updatePajama(id, { name, color })
//         navigate(`/pajamas/${id}`)
//     }
    
//     return (
//         <div>

//             <h1>Edit Pajama</h1>

//             <form onSubmit={handleSubmit}>
//                 <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 />

//                 <input
//                 type="text"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 required
//                 />

//                 <button type="submit">Save Changes</button>
//             </form>

//         </div>
//     )
// }

// export default EditCar