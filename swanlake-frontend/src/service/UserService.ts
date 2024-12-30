import axios, { AxiosResponse } from "axios";

interface UserData {
  name: string;
  email: string;
  password: string;
  [key: string]: any; // untuk fleksibilitas tambahan
}

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

class UserService {
  static BASE_URL: string = "http://localhost:8080";

  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; role: string } | { message: string }> {
    try {
      const response: AxiosResponse<
        { token: string; role: string } | { message: string }
      > = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async register(
    userData: UserData,
    token: string
  ): Promise<{ message: string }> {
    try {
      const response: AxiosResponse<{ message: string }> = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(token: string): Promise<Profile[]> {
    try {
      const response: AxiosResponse<Profile[]> = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getYourProfile(token: string): Promise<Profile> {
    try {
      const response: AxiosResponse<Profile> = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(accountID: string, token: string): Promise<Profile> {
    try {
      const response: AxiosResponse<Profile> = await axios.get(
        `${UserService.BASE_URL}/admin/get-users/${accountID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(
    accountID: string,
    token: string
  ): Promise<{ message: string }> {
    try {
      const response: AxiosResponse<{ message: string }> = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${accountID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(
    accountID: string,
    userData: Partial<UserData>,
    token: string
  ): Promise<{ message: string }> {
    try {
      const response: AxiosResponse<{ message: string }> = await axios.put(
        `${UserService.BASE_URL}/admin/update/${accountID}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /** AUTHENTICATION CHECKER */
  static logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin(): boolean {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser(): boolean {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly(): boolean {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
