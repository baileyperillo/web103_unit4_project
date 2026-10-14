// import { createCar } from '../services/CarsAPI'
// import { getAllCars } from '../services/CarsAPI'
// import { getCar, deleteCar } from '../services/CarsAPI'
// import { getCar, updateCar } from '../services/CarsAPI'

const API_URL = '/api/cars'

const getAllCars = async () => {
  const response = await fetch(API_URL)
  return await response.json()
}

const getCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  return await response.json()
}

const createCar = async (car) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })

  return await response.json()
}

const updateCar = async (id, car) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })

  return await response.json()
}

const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  return await response.json()
}

export {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
}