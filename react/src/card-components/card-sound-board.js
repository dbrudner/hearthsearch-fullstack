import React from 'react'

import sounds from './card-sounds-by-id'

function removeStuff(string) {
	var newString = string.replace(/\./, '')
	newString = newString.replace(/\s/g, '')
	return newString
}

export default function(props) {

    var result = []

    for (var key in sounds) {
        // console.log(typeof key);
        if (key === props.cardId) {
            result.push(sounds[key]);
        }
    }

    function playIntroSound() {

        if (result[0].play.length > 1) {
            var tag = result[0].play[0].name
            var url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
            var audio = new Audio(url);

            var tag = result[0].play[1].name
            var url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
            var audio2 = new Audio(url);
            audio2.play();
            audio.play();
        }

        if (result[0].play.length === 1) {
            var tag = result[0].play[0].name
            var url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
            var audio = new Audio(url);
            audio.play();
        }

    }

    function playAttackSound() {
        var tag = result[0].attack[0].name
        var url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
        var audio = new Audio(url);
        audio.play()
    }

    function playDeathSound() {
        var tag = result[0].death[0].name
        var url = `http://media-hearth.cursecdn.com/audio/card-sounds/sound/${tag}.ogg`
        var audio = new Audio(url);
        audio.play()
    }

    return (
        <div>
            <button onClick={playAttackSound}>Attack</button>
            <button onClick={playIntroSound}>Intro</button>
            <button onClick={playDeathSound}>Death</button>            
        </div>
    )

    
}