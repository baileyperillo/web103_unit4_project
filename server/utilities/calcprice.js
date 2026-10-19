
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
        throw new Error('Invalid pajama customization options')
    }

    const yards = 2

    return (fabricPrice * yards) + sleevePrice + pantPrice
}
