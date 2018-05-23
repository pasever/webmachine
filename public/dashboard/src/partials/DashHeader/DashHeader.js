import React from 'react';
import './dashHeader.css';

export const DashHeader = ({text}) => 
    <header>
     {console.log(text) }
        <div className="header-wrapper">
            <h1 className="title">
                { text.title}
            </h1>
            <p className="paragraph">{ text.subTitle }</p>
            <a href="/member" className="btn btn-default">{ text.searchNetworksButton }</a>
        </div>
    </header>
