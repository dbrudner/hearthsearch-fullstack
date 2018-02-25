import React from 'react'

export default function Comments(props) {

    console.log(props.comments)

    const renderComments = comments => {

        return comments.map(comment => {

            return (
                <div>
                    <div>
                        {comment.user.local.email}
                    </div>
                    <div>
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