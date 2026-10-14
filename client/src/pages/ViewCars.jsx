import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars } from '../services/CarsAPI'

const ViewCars = () => {

    const [cars, setCars] = useState([])

    useEffect(() => {
    const fetchCars = async () => {
        const data = await getAllCars()
        setCars(data)
    }

        fetchCars()
    }, [])
    
    return (
        <div>

            <h1>All Cars</h1>

            <Link to="/cars/create">Create a Car</Link>

            {cars.map((car) => (
                <div key={car.id}>
                <h2>{car.name}</h2>
                <p>Color: {car.color}</p>

                <Link to={`/customcars/${car.id}`}>View Details</Link>
                </div>
            ))}
            
        </div>
    )
}

export default ViewCars