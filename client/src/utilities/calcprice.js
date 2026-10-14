const calculatePrice = (car) => {
  let total = 20000 // Base price

  // Color options
  if (car.color === 'Red') {
    total += 500
  }

  // Wheel options
  if (car.wheels === 'Sport') {
    total += 1200
  }

  // Interior options
  if (car.interior === 'Leather') {
    total += 1500
  }

  return total
}

export { calculatePrice }