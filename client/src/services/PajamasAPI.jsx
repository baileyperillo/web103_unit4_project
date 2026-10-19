
const API_URL = '/api/pajamas'

// GET all pajama sets
export const getAllPajamas = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to fetch pajamas')
  return response.json()
}

// GET a single pajama set
export const getPajama = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch pajama')
  return response.json()
}

// POST a new pajama set
export const createPajama = async (pajama) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pajama)
  })

  if (!response.ok) throw new Error('Failed to create pajama')
  return response.json()
}

// PUT update an existing pajama set
export const updatePajama = async (id, pajama) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pajama)
  })

  if (!response.ok) throw new Error('Failed to update pajama')
  return response.json()
}

// DELETE a pajama set
export const deletePajama = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) throw new Error('Failed to delete pajama')
  return response.json()
}









// // import { createCar } from '../services/CarsAPI'
// // import { getAllCars } from '../services/CarsAPI'
// // import { getCar, deleteCar } from '../services/CarsAPI'
// // import { getCar, updateCar } from '../services/CarsAPI'

// const API_URL = '/api/cars'

// const getAllCars = async () => {
//   const response = await fetch(API_URL)
//   return await response.json()
// }

// const getCar = async (id) => {
//   const response = await fetch(`${API_URL}/${id}`)
//   return await response.json()
// }

// const createCar = async (car) => {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(car)
//   })

//   return await response.json()
// }

// const updateCar = async (id, car) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(car)
//   })

//   return await response.json()
// }

// const deleteCar = async (id) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE'
//   })

//   return await response.json()
// }

// export {
//   getAllCars,
//   getCar,
//   createCar,
//   updateCar,
//   deleteCar
// }