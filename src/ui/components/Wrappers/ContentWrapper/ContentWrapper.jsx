import './ContentWrapper.scss';
import React from 'react';

function ContentWrapper({ children, className = '' }) {
    return (
        <div className={`${className} content-wrapper`}>
            {children}
        </div>
    );
}

export default ContentWrapper;
