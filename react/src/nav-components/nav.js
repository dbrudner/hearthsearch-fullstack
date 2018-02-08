import React from 'react'

export default function Nav(props) {
    return (
        <nav class='navbar nav'>
             <a class="navbar-brand" href="/">Brand</a>
             <ul class='nav navbar-nav'>
                <li><a href="/">Build</a></li>
                <li><a href="/search">Search</a></li>
                {/* <li><a href="#">Link</a></li> */}
             </ul>
        </nav>
    )
}