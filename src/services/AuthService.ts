import { BASE_URL, NEXT_API_KEY } from "@/constants";

const AuthService = {
  login: async ({
    email,
    password,
  }: any): Promise<any> => {
    const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": NEXT_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const responseJson = await response.json();
    console.log("responseJson", responseJson);
    
    return responseJson;
  },
  getOwnProfile: async ({token}:any) => {
    const response = await fetch(`${BASE_URL}auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": NEXT_API_KEY,
        "Authorization": `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    console.log("responseJson", responseJson);
    return responseJson;
  },
  refreshToken:async({token}:any):Promise<any>=>{
    console.log("token", token);
    
    const response = await fetch(`${BASE_URL}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": NEXT_API_KEY,
        "Authorization": `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    console.log("responseJson", responseJson);
  }
};

export default AuthService;
