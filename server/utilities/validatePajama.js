
// const validOptions = {
//     fabric: ['Cotton Jersey', 'Silk', 'Cotton Flannel', 'Cotton Poplin'],
//     color: ['White', 'Black', 'Blue', 'Pink', 'Red'],
//     sleeve_style: ['Long Loose', 'Elbow Loose', 'Long Tight', 'Short Loose'],
//     pant_style: ['Long', 'Knee Length', 'Short Shorts']
// }

// export const validatePajama = (pajama) => {
//     if (typeof pajama.name !== 'string' || !pajama.name.trim()) {
//         return 'Please enter a pajama set name.'
//     }

//     for (const [field, options] of Object.entries(validOptions)) {
//         if (!options.includes(pajama[field])) {
//             return `Invalid ${field.replace('_', ' ')} selection.`
//         }
//     }

//     return null
// }

const validOptions = {
    fabric: ['Cotton Jersey', 'Silk', 'Cotton Flannel', 'Cotton Poplin'],
    color: ['White', 'Black', 'Blue', 'Pink', 'Red'],
    sleeve_style: ['Long Loose', 'Elbow Loose', 'Long Tight', 'Short Loose'],
    pant_style: ['Long', 'Knee Length', 'Short Shorts']
}

export const validatePajama = (pajama) => {
    if (typeof pajama.name !== 'string' || !pajama.name.trim()) {
        return 'Please enter a pajama set name.'
    }

    for (const [field, options] of Object.entries(validOptions)) {
        if (!options.includes(pajama[field])) {
            return `Invalid ${field.replace('_', ' ')} selection.`
        }
    }

    return null
}
