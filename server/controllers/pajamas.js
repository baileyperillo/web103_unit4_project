
import { pool } from '../config/database.js'
import { calculatePrice } from '../utilities/calcprice.js'
import { validatePajama } from '../utilities/validatePajama.js'

// GET: Retrieve all customized pajama sets
export const getPajamas = async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM pajamas ORDER BY id ASC'
    )

    res.status(200).json(results.rows)
  } catch (error) {
    console.error('Error fetching pajamas:', error)
    res.status(500).json({ error: 'Failed to retrieve pajamas' })
  }
}

// GET: Retrieve one pajama set by ID
export const getPajama = async (req, res) => {
  try {
    const { id } = req.params

    const results = await pool.query(
      'SELECT * FROM pajamas WHERE id = $1',
      [id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Pajama set not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    console.error('Error fetching pajama:', error)
    res.status(500).json({ error: 'Failed to retrieve pajama' })
  }
}

// POST: Create a customized pajama set

export const createPajama = async (req, res) => {
    try {
        const validationError = validatePajama(req.body)

        if (validationError) {
            return res.status(400).json({ error: validationError })
        }

        const {
            name,
            fabric,
            color,
            sleeve_style,
            pant_style
        } = req.body

        if (!name?.trim() || !color) {
            return res.status(400).json({
                error: 'Pajama name and color are required'
            })
        }

        const pajama = {
            fabric,
            sleeve_style,
            pant_style
        }

        let price

        try {
            price = calculatePrice(pajama)
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }

        const results = await pool.query(
            `INSERT INTO pajamas
             (name, fabric, color, sleeve_style, pant_style, price)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name, fabric, color, sleeve_style, pant_style, price]
        )

        res.status(201).json(results.rows[0])
    } catch (error) {
        console.error('Error creating pajama:', error)
        res.status(500).json({
            error: 'Failed to create pajama'
        })
    }
}

//----old code below
// export const createPajama = async (req, res) => {
//   try {
//     const {
//       name,
//       fabric,
//       color,
//       sleeve_style,
//       pant_style
//     } = req.body

//     // Temporary price until we implement pricing
//     const price = 30.00

//     const results = await pool.query(
//       `INSERT INTO pajamas
//        (name, fabric, color, sleeve_style, pant_style, price)
//        VALUES ($1, $2, $3, $4, $5, $6)
//        RETURNING *`,
//       [name, fabric, color, sleeve_style, pant_style, price]
//     )

//     res.status(201).json(results.rows[0])
//   } catch (error) {
//     console.error('Error creating pajama:', error)
//     res.status(500).json({ error: 'Failed to create pajama' })
//   }
// }

//--------old code above


// PUT: Update a customized pajama set

export const updatePajama = async (req, res) => {
    try {

      // Validate the pajama selections
        const validationError = validatePajama(req.body)

        if (validationError) {
            return res.status(400).json({ error: validationError })
        }

        const { id } = req.params

        const {
            name,
            fabric,
            color,
            sleeve_style,
            pant_style
        } = req.body

        if (!name?.trim() || !color) {
            return res.status(400).json({
                error: 'Pajama name and color are required'
            })
        }

        const pajama = {
            fabric,
            sleeve_style,
            pant_style
        }

        let price

        try {
            price = calculatePrice(pajama)
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }

        const results = await pool.query(
            `UPDATE pajamas
             SET name = $1,
                 fabric = $2,
                 color = $3,
                 sleeve_style = $4,
                 pant_style = $5,
                 price = $6
             WHERE id = $7
             RETURNING *`,
            [name, fabric, color, sleeve_style, pant_style, price, id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({
                error: 'Pajama set not found'
            })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        console.error('Error updating pajama:', error)
        res.status(500).json({
            error: 'Failed to update pajama'
        })
    }
}

//------old code below
// export const updatePajama = async (req, res) => {
//   try {
//     const { id } = req.params
//     const {
//       name,
//       fabric,
//       color,
//       sleeve_style,
//       pant_style
//     } = req.body

//     const price = 30.00

//     const results = await pool.query(
//       `UPDATE pajamas
//        SET name = $1,
//            fabric = $2,
//            color = $3,
//            sleeve_style = $4,
//            pant_style = $5,
//            price = $6
//        WHERE id = $7
//        RETURNING *`,
//       [name, fabric, color, sleeve_style, pant_style, price, id]
//     )

//     if (results.rows.length === 0) {
//       return res.status(404).json({ error: 'Pajama set not found' })
//     }

//     res.status(200).json(results.rows[0])
//   } catch (error) {
//     console.error('Error updating pajama:', error)
//     res.status(500).json({ error: 'Failed to update pajama' })
//   }
// }

// -------old code above

// DELETE: Delete a customized pajama set
export const deletePajama = async (req, res) => {
  try {
    const { id } = req.params

    const results = await pool.query(
      'DELETE FROM pajamas WHERE id = $1 RETURNING *',
      [id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Pajama set not found' })
    }

    res.status(200).json({
      message: 'Pajama set deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting pajama:', error)
    res.status(500).json({ error: 'Failed to delete pajama' })
  }
}


// export {

// }