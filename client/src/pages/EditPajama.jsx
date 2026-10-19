

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPajama, updatePajama } from '../services/PajamasAPI'
import { calculatePrice } from '../utilities/calcprice'
import FabricPreview from '../components/FabricPreview'
import '../App.css'


const fabricOptions = [
    { name: 'Cotton Jersey', price: 16 },
    { name: 'Silk', price: 64 },
    { name: 'Cotton Flannel', price: 16 },
    { name: 'Cotton Poplin', price: 14 }
]

const sleeveOptions = [
    { name: 'Long Loose', price: 5 },
    { name: 'Elbow Loose', price: 3 },
    { name: 'Long Tight', price: 6 },
    { name: 'Short Loose', price: 4 }
]

const pantOptions = [
    { name: 'Long', price: 8 },
    { name: 'Knee Length', price: 7 },
    { name: 'Short Shorts', price: 7 }
]

const colorOptions = ['White', 'Black', 'Blue', 'Pink', 'Red']


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
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

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

    const handleChange = (e) => {
        const { name, value } = e.target

        setPajama((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const renderOptions = (field, options) => (
        <div className="pajama-options">
            {options.map((option) => {
                const selected = pajama[field] === option.name

                return (
                    <label
                        key={option.name}
                        className={`pajama-option ${selected ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            name={field}
                            value={option.name}
                            checked={selected}
                            onChange={handleChange}
                            required
                        />

                        <span>{option.name}</span>
                        <strong>${option.price.toFixed(2)}</strong>
                    </label>
                )
            })}
        </div>
    )

    const totalPrice = calculatePrice(pajama)

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

    if (loading) {
        return <p>Loading pajama set...</p>
    }

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
                    type="text"
                    name="name"
                    value={pajama.name}
                    onChange={handleChange}
                    required
                />

                <fieldset>
                    <legend>Fabric (2 yards)</legend>
                    {renderOptions('fabric', fabricOptions)}
                </fieldset>

                <fieldset>
                    <legend>Color</legend>
                    <div className="pajama-options">
                        {colorOptions.map((color) => (
                            <label
                                key={color}
                                className={`pajama-option ${pajama.color === color ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={pajama.color === color}
                                    onChange={handleChange}
                                    required
                                />
                                <span>{color}</span>
                                <strong>Included</strong>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Fabric Color Preview */}
                <FabricPreview color={pajama.color} />

                <fieldset>
                    <legend>Sleeve Style</legend>
                    {renderOptions('sleeve_style', sleeveOptions)}
                </fieldset>

                <fieldset>
                    <legend>Pant Style</legend>
                    {renderOptions('pant_style', pantOptions)}
                </fieldset>

                <div className="pajama-total">
                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>

                <Link to={`/custompajamas/${id}`}>
                    Cancel
                </Link>
            </form>
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