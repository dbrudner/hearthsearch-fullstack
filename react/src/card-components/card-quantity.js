import React from 'react'

export default function CardQuantity(props) {

    if (props.quantity) {
        console.log(props.name, props.quantity)        
    }

    if (props.quantity === 1) {
        return (
            <div>
                Added one copyasdfasdf
            </div>
        )
    } 
    
    if (props.quantity === 2) {
        return (
            <div>
                Added two copiesasdfasdf
            </div>
        )
    }
    
    else {
        return (
            <div>

            </div>
        )
    }    
}