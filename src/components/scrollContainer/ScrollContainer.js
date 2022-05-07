import React from 'react'

function ScrollContainer({ children }) {
    return (
        <div style={{ paddingLeft: "2rem", paddingRight: "2rem", marginY: "8rem", overflowY: 'scroll', height: '500px' }}>
            {children}
        </div>
    )
}

export default ScrollContainer