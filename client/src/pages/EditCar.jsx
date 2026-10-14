import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, updateCar } from '../services/CarsAPI'


const EditCar = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        const fetchCar = async () => {
        const car = await getCar(id)
        setName(car.name)
        setColor(car.color)
        }

        fetchCar()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await updateCar(id, { name, color })
        navigate(`/customcars/${id}`)
    }
    
    return (
        <div>

            <h1>Edit Car</h1>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />

                <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                />

                <button type="submit">Save Changes</button>
            </form>

        </div>
    )
}

export default EditCar