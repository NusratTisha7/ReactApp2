import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return(
            <div>
                <span className="menu-btn">
                   <button>Pick</button>
                </span>
            </div>
        );
    }
}