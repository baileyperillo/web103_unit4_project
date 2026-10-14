import { pool } from '../config/database.js'

// GET all cars
export const getCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE a car
export const createCar = async (req, res) => {
  try {
    const { name, color } = req.body

    const results = await pool.query(
      'INSERT INTO cars (name, color) VALUES ($1, $2) RETURNING *',
      [name, color]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// UPDATE a car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params
    const { name, color } = req.body

    const results = await pool.query(
      'UPDATE cars SET name = $1, color = $2 WHERE id = $3 RETURNING *',
      [name, color, id]
    )

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE a car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM cars WHERE id = $1', [id])

    res.status(200).json({ message: 'Car deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Export all functions
// export {
//   getCars,
//   createCar,
//   updateCar,
//   deleteCar
// }