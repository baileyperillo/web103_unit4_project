
const fabricPrices = {
    'Cotton Jersey': 8,
    'Silk': 32,
    'Cotton Flannel': 8,
    'Cotton Poplin': 7
}

const sleevePrices = {
    'Long Loose': 5,
    'Elbow Loose': 3,
    'Long Tight': 6,
    'Short Loose': 4
}

const pantPrices = {
    'Long': 8,
    'Knee Length': 7,
    'Short Shorts': 7
}

export const calculatePrice = (pajama) => {
    const fabricPrice = fabricPrices[pajama.fabric]
    const sleevePrice = sleevePrices[pajama.sleeve_style]
    const pantPrice = pantPrices[pajama.pant_style]

    if (
        fabricPrice === undefined ||
        sleevePrice === undefined ||
        pantPrice === undefined
    ) {
        return 0
    }

    const yards = 2

    return (fabricPrice * yards) + sleevePrice + pantPrice
}




// const calculatePrice = (car) => {
//   let total = 20000 // Base price

//   // Color options
//   if (car.color === 'Red') {
//     total += 500
//   }

//   // Wheel options
//   if (car.wheels === 'Sport') {
//     total += 1200
//   }

//   // Interior options
//   if (car.interior === 'Leather') {
//     total += 1500
//   }

//   return total
// }

// export { calculatePrice }