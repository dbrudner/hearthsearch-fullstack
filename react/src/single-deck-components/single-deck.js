import React from 'react'
import axios from 'axios'
import request from 'request'

export default function SingleDeck() {
    // ObjectId("5a7ed36b9ca21903680dbff3")
    axios.get('/api/deck/5a7ed36b9ca21903680dbff3')
    .then(function(response) {
        console.log(response.data)
    })

    return (
        null
    )
}