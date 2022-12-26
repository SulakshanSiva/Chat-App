import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App.js';
import { AuthContextProvider } from './Context/AuthContext.js';
import { ChatContextProvider } from './Context/ChatContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <React.StrictMode>
                    <App />
            </React.StrictMode>
        </ChatContextProvider>
  </AuthContextProvider>
);

