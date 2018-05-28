import React from 'react';
import './dashHeader.css';

export const DashHeader = ({text}) => 
    <header>
     {console.log(text) }
        <div className="header-wrapper">
            <h1 className="title animated fadeInDown">
                { text.title}
            </h1>
            <p className="paragraph animated fadeInRight">{ text.subTitle }</p>
            <a href="/member" className="btn btn-default  animated fadeInUp">{ text.searchNetworksButton }</a>
        </div>
    </header>
