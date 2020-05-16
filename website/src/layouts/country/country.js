 import React from 'react';

import Nav from '../../components/nav' 

export default function CountryLayout(props) {
    return(
        <div>
            <div style={{
            backgroundColor: 'white',
            position:"relative",
            display:'flex',
            justifyContent:'center'}}>
            <a href="/">
                <img 
                style={{
                    maxHeight:'20vh',
                    maxWidth:'20vw',
                    paddingTop:'2vh',
                    marginBottom:'1.5vh'}}
                src="/static/images/smolidays-logo-1.png" 
                alt="smolidays-logo"/>
            </a>
            </div>
            <Nav/>
            {props.children}
        </div>
    )
}