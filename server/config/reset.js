import { pool } from './database.js'

// Create pajamas table
const createPajamasTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pajamas (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      fabric VARCHAR(50) NOT NULL,
      color VARCHAR(50) NOT NULL,
      sleeve_style VARCHAR(50) NOT NULL,
      pant_style VARCHAR(50) NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('Pajamas table created successfully!')
  } catch (error) {
    console.error('Error creating pajamas table:', error)
    throw error
  }
}

// Run reset
const resetDatabase = async () => {
  try {
    await createPajamasTable()
    console.log('Database setup completed!')
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

resetDatabase()