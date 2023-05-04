import "./Header.scss"
import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH_VARIBLES, POPULAR_TOPIC_ID } from '../../../utils/Constants';

function Header() {
    return (
        <header className='header-wrapper header'>
            <Button
                component={Link}
                to={PATH_VARIBLES.ROUTES.MAIN()}
                className='header__main-link'
                variant="contained"
            >
                Main page
            </Button>
            <Button
                component={Link}
                to={PATH_VARIBLES.ROUTES.NEWS(POPULAR_TOPIC_ID)}
                className='header__main-link'
                variant="contained"
            >
                Popular topic (more comments avaliable)
            </Button>
        </header>
    );
}

export default Header;
