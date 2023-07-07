import { useState, useCallback, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import {
  login,
  signup,
  searchUsers,
  getUsers,
  updateUser,
  ChangeStatus,
  DeleteUser,
  getUserInfo,
} from "../service/userApi";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../service/localStorage";
import { useUser } from "../providers/UserProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import UserType, {
  Login,
  NormalizedEditUser,
  RegistrationForm,
  TokenType,
  UserMapToModelType,
  UsersType,
} from "../models/types/userType";
import normalizeUser from "../helpers/normalization/normalizeUser";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";
import { useSnack } from "../../providers/SnackbarProvider";

const useHandleUsers = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<null | UserType[]>(null);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const snack = useSnack();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockExpiry, setBlockExpiry] = useState<Date | null>(null);

  useAxios();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: string | null,
      user: null | TokenType = null,
      users: UsersType[] | null
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      setUsers(users);
    },
    [setUser]
  );

  const handleLogin = async (user: Login) => {
    try {
      if (isBlocked) {
        snack("error", "You got blocked for 24 hours");
        return;
      }

      setLoading(true);
      const token = await login(user);
      setTokenInLocalStorage(token);
      setToken(token);
      const userFromLocalStorage = getUser();
      requestStatus(false, null, userFromLocalStorage, null);
      navigate(ROUTES.CARDS);
    } catch (error) {
      if (typeof error === "string") {
        setFailedAttempts((prevAttempts) => prevAttempts + 1);

        if (failedAttempts === 2) {
          const blockDuration = 24 * 60 * 60 * 1000;
          const expiryDate = new Date(Date.now() + blockDuration);
          setIsBlocked(true);
          setBlockExpiry(expiryDate);
        }

        requestStatus(false, error, null, null);
      }
    }
  };

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
    navigate(ROUTES.CARDS);
  }, [setUser]);

  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleSearch = useCallback(
    async (firstName: string, lastName: string, isBusiness: boolean) => {
      try {
        setLoading(true);
        const users = await searchUsers(firstName, lastName, isBusiness);
        setFilteredUsers(users);
        setLoading(false);
      } catch (error) {
        if (typeof error === "string") {
          requestStatus(false, error, null, null);
        }
      }
    },
    []
  );

  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      requestStatus(false, null, null, users);
      return users;
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);

  const handleGetUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const user = await getUserInfo(userId);
      requestStatus(false, null, null, null);
      return user;
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);

  const handleChangeStatus = useCallback(async (userOld: TokenType) => {
    try {
      setLoading(true);
      const user = await ChangeStatus(userOld);
      handleGetUsers();
      requestStatus(false, null, user, null);
      snack("success", "The user has been successfully updated");
      return user;
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);

  const handleDeleteUser = useCallback(async (userOld: UserType) => {
    try {
      setLoading(true);
      if (!userOld._id) {
        throw new Error("Invalid user ID");
      }
      const user = await DeleteUser(userOld._id);
      requestStatus(false, null, user, null);
      handleGetUsers();
      snack("success", "The user has been successfully deleted");
      return user;
    } catch (error) {
      if (typeof error === "string") {
        return requestStatus(false, error, null, null);
      }
    }
  }, []);

  const handleUpdateUser = useCallback(
    async (userFromClient: RegistrationForm) => {
      try {
        setLoading(true);
        if (!userFromClient || typeof userFromClient === "string") {
          return navigate(ROUTES.ROOT);
        }
        const normalizedEditUser = normalizeUser(userFromClient);
        normalizedEditUser._id = user?._id;
        const userFromServer = await updateUser(normalizedEditUser);
        if (userFromServer) {
          requestStatus(false, null, userFromServer, null);
          snack("success", "The user has been successfully updated");
          navigate(ROUTES.ROOT);
        }
      } catch (error) {
        if (typeof error === "string") {
          requestStatus(false, error, null, null);
        }
      }
    },
    []
  );

  const value = useMemo(() => {
    return { isLoading, error, user, filteredUsers, users };
  }, [isLoading, error, user, filteredUsers, users]);

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
    handleSearch,
    handleGetUsers,
    handleUpdateUser,
    handleGetUser,
    handleChangeStatus,
    handleDeleteUser,
  };
};

export default useHandleUsers;
