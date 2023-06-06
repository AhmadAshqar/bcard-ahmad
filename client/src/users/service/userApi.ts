import axios from "axios";
import UserType, {
  Login,
  NormalizedEditUser,
  RegistrationForm,
  TokenType,
  UserMapToModelType,
  UserRegistered,
} from "../models/types/userType";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getUsers = async () => {
  try {
    const { data } = await axios.get<UserType[]>(`${apiUrl}/users`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const { data } = await axios.get<UserType>(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const updateUser = async (normalizedUser: NormalizedEditUser) => {
  try {
    const { data } = await axios.put<NormalizedEditUser>(
      `${apiUrl}/users/${normalizedUser._id}`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const ChangeStatus = async (user: TokenType) => {
  try {
    const { data } = await axios.patch<TokenType>(
      `${apiUrl}/users/${user._id}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const DeleteUser = async (userId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const login = async (user: Login) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const searchUsers = async (
  firstName: string,
  lastName: string,
  isBusiness: boolean
) => {
  try {
    const { data } = await axios.get<UserType[]>(`${apiUrl}/users`, {
      params: {
        firstName,
        lastName,
        isBusiness,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
