import React from 'react';
import {BarChart} from 'react-easy-chart';

export default function DeckManaChart(props) {

    // {
    //     oneCostCards: 2,
    //     twoCostCards: 1,
    //     threeCostCards: 0
    // }


    var curve = []

    for (let i=0; i<props.deck.length; i++) {
        if (props.deck[i].quantity === 1) {
            curve.push(props.deck[i].mana || props.deck[i].cost)
        } 

        if (props.deck[i].quantity === 2) {
            curve.push(props.deck[i].mana || props.deck[i].cost)
            curve.push(props.deck[i].mana || props.deck[i].cost)
        }
    }


    const loop = num => {

    }

    var zeroMana = curve.filter(index => {
        return index === 0
    })

    var oneMana = curve.filter(index => index === 1).length;

    var twoMana = curve.filter(index => {
        return index === 2
    })
    
    var threeMana = curve.filter(index => {
        return index === 3
    })
    
    var fourMana = curve.filter(index => {
        return index === 4
    })

    var fiveMana = curve.filter(index => {
        return index === 5
    })

    var sixMana = curve.filter(index => {
        return index === 6
    })

    var sevenMana = curve.filter(index => {
        return index === 7
    })

    var eightMana = curve.filter(index => {
        return index === 8
    })
    
    var nineMana = curve.filter(index => {
        return index === 9
    })

    var tenMana = curve.filter(index => {
        return index === 10
    })


        if (props.deck.length > 0) {

            return (
                <div className='bar-chart-container panel panel-default'>
                    <BarChart
                        colorBars
                        margin={{top: 10, right: 10, bottom: 0, left: 10}}
                        // barWidth={20}
                        width={170}
                        height={80}
                        // xType={'linear'}
                        data = {[
                            {x: 0, y: zeroMana.length},
                            {x: 1, y: oneMana.length},
                            {x: 2, y: twoMana.length},
                            {x: 3, y: threeMana.length},
                            {x: 4, y: fourMana.length},
                            {x: 5, y: fiveMana.length},
                            {x: 6, y: sixMana.length},
                            {x: 7, y: sevenMana.length},
                            {x: 8, y: eightMana.length},
                            {x: 9, y: nineMana.length},
                            {x: 10, y: tenMana.length},
                        ]}
                    />
                    <div className='x-axis'>
                        0 1 2 3 4 5 6 7 8 9 10
                    </div>
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