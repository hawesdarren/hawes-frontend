
function isTokenExpired(){
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
        return null; // No token found
    }

    try {
        // Decode the token payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Get expiration time
        const expiry = payload.exp ? new Date(payload.exp * 1000) : null; // Convert to milliseconds
        if (!expiry) {
            return null; // No expiration time found
        }
        // Check if token is expired
        const currentTime = new Date();
        return expiry < currentTime;
    } catch (error) {
        console.error("Error getting token expiration:", error);
        return null; // Error in decoding token
    }   
}

function isTokenAuthorized(){
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
        return null; // No token found
    }

    try {
        // Decode the token payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check authorization claim
        return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication'] === 'True';
    } catch (error) {
        console.error("Error checking token authorization:", error);
        return null; // Error in decoding token
    }   
} 

export function verifyToken(){
    
    try {
                
        // Check if token is expired
        const isExpired = isTokenExpired();
        // Check authorization claim
        const isAuthorized = isTokenAuthorized();
        if(isExpired === false && isAuthorized === true){
            console.log("Token is valid: not expired and authorized.");
            return true;
        }
        else {
            console.log("Token is invalid: expired or not authorized.");
            return false;
        }
    
    } catch (error) {
        console.error("Error verifying token:", error);
        return false; // Error in token verification
    }   
}

// For use on non login screens
// Login screens should not attempt to refresh token
export async function refreshToken(){
    try {
        const isExpired = isTokenExpired();
        const isAuthorized = isTokenAuthorized();
        if(isExpired && isAuthorized){
            // Refresh the token logic here
            console.log("Token is expired but authorized. Refreshing token...");
            // Get refresh token from local storage
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if(!refreshTokenValue){
                console.error("No refresh token found.");
                return false;
            }
            // Call refresh token API
            const response = await fetch('/api/authentication/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshTokenValue}`
                },
            });
            
            const data = await response.json();
            
            if(data.token){
                // Store new tokens in local storage
                localStorage.setItem('token', data.token);
                console.log("Token refreshed successfully.");
                return true;
            } else {
                console.error("Failed to refresh token.");
                return false;
            }
        }
        return false;
    } catch (error) {
        console.error("Error in refreshToken function:", error);
        return false;
    }
}

export function clearTokens(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}



  