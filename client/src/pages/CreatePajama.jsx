
import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { createPajama } from '../services/PajamasAPI'

const CreatePajama = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [fabric, setFabric] = useState('')
    const [color, setColor] = useState('')
    const [sleeveStyle, setSleeveStyle] = useState('')
    const [pantStyle, setPantStyle] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const pajama = {
            name,
            fabric,
            color,
            sleeve_style: sleeveStyle,
            pant_style: pantStyle
        }

        try {
            await createPajama(pajama)
            navigate('/custompajamas')
        } catch (error) {
            console.error('Error creating pajamas:', error)
            setError('Unable to save your pajamas. Please try again.')
        }
    }

    return (
        <div className = "pajama-container">
            <h1>Customize Your Pajamas</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Pajama Set Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name your pajama set"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="fabric">Fabric Type</label>
                <select
                    id="fabric"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
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
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                >
                    <option value="">Select Color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Pink">Pink</option>
                    <option value="Red">Red</option>
                </select>

                <label htmlFor="sleeveStyle">Sleeve Style</label>
                <select
                    id="sleeveStyle"
                    value={sleeveStyle}
                    onChange={(e) => setSleeveStyle(e.target.value)}
                    required
                >
                    <option value="">Select Sleeve Style</option>
                    <option value="Long Loose">Long Loose</option>
                    <option value="Elbow Loose">Elbow Loose</option>
                    <option value="Long Tight">Long Tight</option>
                    <option value="Short Loose">Short Loose</option>
                </select>

                <label htmlFor="pantStyle">Pant Style</label>
                <select
                    id="pantStyle"
                    value={pantStyle}
                    onChange={(e) => setPantStyle(e.target.value)}
                    required
                >
                    <option value="">Select Pant Style</option>
                    <option value="Long">Long</option>
                    <option value="Knee Length">Knee Length</option>
                    <option value="Short Shorts">Short Shorts</option>
                </select>

                {error && <p role="alert">{error}</p>}

                <button type="submit">Create Pajama Set</button>
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