import React from 'react'

export default function DeckSearchResults(props) {

    console.log(props.results)

    const renderedResults = props.results.map(deck => {
        return (
            <tr>
                <td>{deck.name}</td>
                <td>{deck.username}</td>
                <td>{deck.class}</td>
                <td>{deck.archetype}</td>
                <td>{deck.curve}</td>
                <td>{deck.cost}</td>
                <td>{deck.upvotes}</td>
                <td>{deck.created}</td>                
            </tr>
        )
    })

    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Creator</th>
                    <th scope="col">Class</th>
                    <th scope="col">Archetype</th>
                    <th scope="col">Curve</th>
                    <th scope="col">Dust</th>
                    <th scope="col">Upvotes</th>
                    <th scope="col">Created</th>
                </tr>
            </thead>
            <tbody>
                {renderedResults}
            </tbody>
        </table>
    )

}