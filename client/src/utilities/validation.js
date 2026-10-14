// Check if all required options are selected
const validateCar = (car) => {
  if (!car.color || !car.wheels || !car.interior) {
    return false
  }

  return true
}

// Check whether a specific combination is allowed
const validateCombination = (car) => {
  // Example: Sport wheels cannot be used with Basic interior
  if (car.wheels === 'Sport' && car.interior === 'Basic') {
    return false
  }

  return true
}

export { validateCar, validateCombination }