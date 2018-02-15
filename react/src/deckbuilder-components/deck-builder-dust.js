import React from 'react'

export default function DeckDust(props) {    
    
    console.log(props.dust)

    if (props.dust) {
        return (
            <div>
                <strong>Cost: </strong>{props.dust}
            </div>
        )
    } else {
        return (
            <div> </div>
        )
    }
}