
import express from 'express'

import {
  getPajamas,
  getPajama,
  createPajama,
  updatePajama,
  deletePajama
} from '../controllers/pajamas.js'

const router = express.Router()

// GET all customized pajama sets
router.get('/', getPajamas)

// GET a single pajama set by ID
router.get('/:id', getPajama)

// POST a new customized pajama set
router.post('/', createPajama)

// PUT to update a pajama set by ID
router.put('/:id', updatePajama)

// DELETE a pajama set by ID
router.delete('/:id', deletePajama)

export default router
