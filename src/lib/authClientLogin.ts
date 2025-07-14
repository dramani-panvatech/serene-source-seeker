export async function authClientLogin({ email, password }: { email: string; password: string; }) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
    console.log(email, password);
    
    const response = await fetch(`${baseUrl}/api/Login/ClientLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    console.log(response);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed. Please try again.');
    }
    return response.json();
  } 