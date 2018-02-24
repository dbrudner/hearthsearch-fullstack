import React from 'react'
import wild from '../images/wild.svg'
import standard from '../images/standard.svg'
import ReactFitText from 'react-fittext'

export default function WildOrStandard(props) {

    const handleClick = (event) => {

        props.getFormat(event.target.name)
    }

    return (
        <div className='wild-or-standard-cntr'>
            <div className='format-header'>
            </div>
            <div className='row'>
                <div className='col-xs-6 col-sm-6 icon-cntr animated fadeIn'>
                    
                    <div className='standard center-block'>
                    <h3 className='text-center'>Standard</h3>
                    
                        <img name="standard" onClick={handleClick} className='format-icon hvr-fade' src={standard} />
                    </div>
                </div>

                <div class='col-xs-6 col-sm-6 icon-cntr'>
                
                    <div className='wild center-block'>
                    <h3 className='text-center'>Wild</h3>
                    
                        <img name="wild" onClick={handleClick} className='format-icon hvr-fade' src={wild} />
                    </div>
                </div>
            </div>
        </div>
    )
}