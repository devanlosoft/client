export function useOauth() {
  interface Credentials {
    email: string;
    password: string;
  }

  const login = async (credentials: Credentials) => {
    try {
      const response = await fetch(`/api/v1/oauth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching OAuth token URL: ${response.statusText}`
        );
      }

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching OAuth token URL:", error);
      return { error };
    }
  };

  const signup = async (newUser: any, API_BASE_URL: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    return data;
  };

  const logout = async () => {
    return null;
  };

  const getUsers = async (token: string, API_BASE_URL: string) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  return {
    login,
    signup,
    logout,
    getUsers,
  };
}
