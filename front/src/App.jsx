import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Test from './Test';
import MintNFT from './MintNFT';
import './App.css';
import Chatbox from './chatbox';
import Welcome from './Welcome';
import Login from './login';
import { isAuthenticated } from './auth';

const ProtectedRoute = ({ element, ...rest }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsUserAuthenticated(authenticated);
      } catch (error) {
        setIsUserAuthenticated(false); 
      } finally {
        setIsLoading(false); 
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isUserAuthenticated ? element : <Navigate to="/welcome" />;
};


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/test" element={<Test />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/email" element={<EmailUserPage/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/mint-nft" element={<MintNFT />} />
          <Route path="/chat" element={<ProtectedRoute element={<Chatbox />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
