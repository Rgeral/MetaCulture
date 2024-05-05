export const isAuthenticated = async () => {
    const jwtCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt='));
  
    if (!jwtCookie) {
      return false; 
    }
    const token = jwtCookie.split('=')[1];

  
    try {
      
      const response = await fetch('http://localhost:4000/verify-jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }), 
    });
  
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error verifying JWT:', error);
      return false; 
    }
  };
  