import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <div className='centered'>
            <h3>Minimized link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></h3>
            <p>Your link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks counter: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}
