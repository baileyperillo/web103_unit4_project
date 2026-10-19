

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPajama } from '../services/PajamasAPI'
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

const CreatePajama = () => {
    const navigate = useNavigate()

    const [pajama, setPajama] = useState({
        name: '',
        fabric: '',
        color: '',
        sleeve_style: '',
        pant_style: ''
    })

    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setPajama((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const totalPrice = calculatePrice(pajama)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)

        try {
            
            await createPajama(pajama)
            navigate('/custompajamas')
        } catch (error) {
            console.error('Error creating pajama:', error)
            setError('Unable to create pajama set.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="pajama-container">
            <h1>Create Your Pajama Set</h1>

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

                {/* Display the selected fabric color */}
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
                    {saving ? 'Saving...' : 'Create Pajama Set'}
                </button>
            </form>
        </div>
    )
}

export default CreatePajama







// //import React from 'react'
// import React, { useState, useEffect } from 'react'
// import '../App.css'
// import { useNavigate } from 'react-router-dom'
// import { createCar } from '../services/CarsAPI'
// import {
//     validateCar,
//     validateCombination
// } from '../utilities/validation'

// import { calculatePrice } from '../utilities/calcprice'

// const CreateCar = () => {
//     const navigate = useNavigate()
//     const [name, setName] = useState('')
//     const [color, setColor] = useState('')

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!validateCar(car) || !validateCombination(car)) {
//             alert('Please select valid customization options.')
//             return
//         }

//         const totalPrice = calculatePrice({ name, color })

//         await createCar({
//             name,
//             color,
//             price: totalPrice
//         })

//         navigate('/customcars')
//     }


//     return (
//         <div>
//             <h1>Create a Car</h1>

//             <form onSubmit={handleSubmit}>
//                 <input
//                 type="text"
//                 placeholder="Car Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 />

//                 <input
//                 type="text"
//                 placeholder="Car Color"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 required
//                 />

//                 <button type="submit">Create Car</button>
//             </form>

//         </div>
//     )
// }

// export default CreateCar