import express from 'express'

import {
  getCars,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/customItems.js'

const router = express.Router()

// GET all cars
router.get('/', getCars)

// POST a new car
router.post('/', createCar)

// PUT to update a car by ID
router.put('/:id', updateCar)

// DELETE a car by ID
router.delete('/:id', deleteCar)

export default router