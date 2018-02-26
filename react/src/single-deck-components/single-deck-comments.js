import React from 'react'
import { Link } from 'react-router-dom'

export default function Comments(props) {

    console.log(props.comments)

    const renderComments = comments => {

        return comments.map(comment => {

            return (
                <div className='comments-panel'>
                    <div className='user-comment flex'>
                        <div>
                        <Link to='/user'>
                            {comment.user.local.email}
                        </Link>
                        </div>
                        <div className='date'>
                            Date
                        </div>
                    </div>
                    <hr/>
                    <div className='comment-body'>
                        {comment.comment}
                    </div>
                </div>
            )
        })
    }


    return (
        <div>
            {renderComments(props.comments)}
        </div>
    )
}