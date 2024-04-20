import React from 'react';
import { createRoot } from 'react-dom/client';
import NoteApp from './App';
import { BrowserRouter } from 'react-router-dom';

// global style
import './styles/global.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <NoteApp />
    </BrowserRouter>
);
