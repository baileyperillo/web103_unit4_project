import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'

const CarDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
        const data = await getCar(id)
        setCar(data)
        }

        fetchCar()
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/cars')
    }

    if (!car) return <p>Loading...</p>


    return (
        <div>

            <h1>{car.name}</h1>
            <p>Color: {car.color}</p>
            <Link to={`/edit/${id}`}>Edit Car</Link>
            <button onClick={handleDelete}>Delete Car</button>
            navigate('/customcars')

        </div>
    )
}

export default CarDetails