import React, { useState, useEffect } from 'react';

function Login() {
    const [token, setToken] = useState(null); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/test');
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
        </div>
    );
}

export default Login;
