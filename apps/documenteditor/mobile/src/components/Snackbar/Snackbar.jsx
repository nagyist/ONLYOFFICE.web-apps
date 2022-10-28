import React from 'react';

const Snackbar = props => {
    return (
        <div className="snackbar">
            <div className="snackbar__content">
                <span className="snackbar__text">{props.text}</span>
            </div>
        </div>
    )
}

export default Snackbar;