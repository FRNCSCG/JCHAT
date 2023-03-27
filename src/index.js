import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import LayoutContextProvider from './context/LayoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthContextProvider>
    <ChatContextProvider>
      <LayoutContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </LayoutContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
  
);


