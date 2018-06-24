import React from 'react';
import './dashHeader.css';

export const DashHeader = ({text}) => 
    <header>
        <div className="header-wrapper">
            <h1 className="title animated fadeInDown">
                { text.title}
            </h1>
            <p className="paragraph animated fadeInRight">{ text.subTitle }</p>
            <a href="/docs" className="btn btn-default  animated fadeInUp">{ text.documentationButton }</a>
        </div>
    </header>
