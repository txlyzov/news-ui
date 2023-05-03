import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../ui/pages/main-page/MainPage';
import ROUTES from './Routes';

function AppRouter() {
    return (
        <Routes>
            {ROUTES.map((route) =>
                <Route
                    key={uuidv4()}
                    path={route.path}
                    element={route.element}
                    exact={route.exact} />
            )}
            <Route path="*" element={<MainPage />} />
        </Routes>
    );
}

export default AppRouter;
