import React from 'react'
import {Button} from "@mui/material";
import '../Styles/NavigationBar.css';

//replace HEX_CLAN_BLACK.png with websites icon later

const NavigationBar = () => {
return (
        <div className='body'>
            
            <Button style={navBtn}
                 onClick={event =>  window.location.href='/'} >
                <img style={imageS} src={require('../Styles/HEX_CLAN_BLACK.png')} />
            </Button>

            <Button style={navBtn}
                 onClick={event =>  window.location.href='/theory'} >
                 Theory
            </Button>

            <Button style={navBtn}
                 onClick={event =>  window.location.href='/tasks'} >
                Tasks
            </Button>

            <Button style={navBtn}
                onClick={event =>  window.location.href='/rules'} >
                Rules
            </Button>

            <Button style={navBtn}
                onClick={event =>  window.location.href='/about'} >
                About
            </Button>

            <Button style={profileBtn}
                onClick={event =>  window.location.href='/Register'}>
                Profile
            </Button>

        </div>
)
}

const navBtn={
    height: '40px',
    width: '8%',
    marginTop: '20px',
    marginLeft: '2%',
    color: 'black',
    padding:'5px',
    fontWeight: 'bold',
}

const imageS={
    height: '60px',
}

const profileBtn={
    height: '40px',
    width: '8%',
    float: 'right',
    marginTop: '20px',
    marginRight: '5%',
    color: 'black',
    padding:'5px',
    fontWeight: 'bold',
}

export default NavigationBar
