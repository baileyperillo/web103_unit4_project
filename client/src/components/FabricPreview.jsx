
import React from 'react'

const fabricImages = {
    White: '/images/fabrics/white-jersey.jpeg',
    Black: '/images/fabrics/black-jersey.jpeg',
    Blue: '/images/fabrics/blue-jersey.webp',
    Pink: '/images/fabrics/pink-jersey.jpeg',
    Red: '/images/fabrics/red-jersey.jpeg'
}

const FabricPreview = ({ color }) => {
    const image = fabricImages[color]

    return (
        <div className="fabric-preview">
            <h3>Fabric Color Preview</h3>

            {image ? (
                <img
                    src={image}
                    alt={`${color} fabric color sample`}
                    className="fabric-image"
                />
            ) : (
                <p>Select a color to preview the fabric.</p>
            )}
        </div>
    )
}

export default FabricPreview
