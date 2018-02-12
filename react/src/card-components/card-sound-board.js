import React from 'react'
import sounds from './card-sounds-by-id'

export default function(props) {

    var result = []
    console.log(props.cardId)
    for (var key in sounds) {
        // console.log(typeof key);
        if (key === props.cardId) {
            result.push(sounds[key]);
        }
    }

    function playIntroSound() {
        return console.log(result)
        
        if (result[0].play.length > 1) {
            {
                let tag = result[0].play[0].name
                let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
                let audio = new Audio(url);
                // audio.play();
                console.log(url)
            }
    
            {
                let tag = result[0].play[1].name
                let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
                let audio = new Audio(url);
                // audio.play(); 
                console.log(url)
                   
            }
        }

        if (result[0].play.length === 1) {
            let tag = result[0].play[0].name
            let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
            let audio = new Audio(url);
            // audio.play();
            console.log(url)
            
        }

    }

    function playAttackSound() {
        let tag = result[0].attack[0].name
        let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
        let audio = new Audio(url);
        // audio.play()
        console.log(url)
        
    }

    function playDeathSound() {
        let tag = result[0].death[0].name
        let url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
        let audio = new Audio(url);
        // audio.play()
        console.log(url)
        
    }

    return (
        <div>
            <button onClick={playAttackSound}>Attack</button>
            <button onClick={playIntroSound}>Intro</button>
            <button onClick={playDeathSound}>Death</button>            
        </div>
    )

    
}