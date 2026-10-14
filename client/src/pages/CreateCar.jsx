//import React from 'react'
import React, { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import {
    validateCar,
    validateCombination
} from '../utilities/validation'

import { calculatePrice } from '../utilities/calcprice'

const CreateCar = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateCar(car) || !validateCombination(car)) {
            alert('Please select valid customization options.')
            return
        }

        const totalPrice = calculatePrice({ name, color })

        await createCar({
            name,
            color,
            price: totalPrice
        })

        navigate('/customcars')
    }


    return (
        <div>
            <h1>Create a Car</h1>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Car Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />

                <input
                type="text"
                placeholder="Car Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                />

                <button type="submit">Create Car</button>
            </form>

        </div>
    )
}

export default CreateCar