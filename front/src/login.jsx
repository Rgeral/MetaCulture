import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [token, setToken] = useState(null); 

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/chat');
      };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/get_jwt');
            const responseData = await response.json();
            const tokenFromResponse = responseData.token;
            setToken(tokenFromResponse); 
            document.cookie = `jwt=${tokenFromResponse}; path=/;`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>You are logged !</h2>
            <button
                            type="button"
                            className="inline-flex w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 sm:ml-0 sm:w-auto"
                            onClick={() => handleRedirect()}
                          >
                            Super
            </button>
        </div>
    );
}

export default Login;
