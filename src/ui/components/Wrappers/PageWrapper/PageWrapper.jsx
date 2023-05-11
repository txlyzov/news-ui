import './PageWrapper.scss';
import React from 'react';

function PageWrapper({ children, className = '' }) {
    return (
        <div className={`${className ? `${className} ` : ''}page-wrapper`}>
            {children}
        </div>
    );
}

export default PageWrapper;
