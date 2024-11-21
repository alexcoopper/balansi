import { API } from "../libs/api";
import { setAuthenticated } from "../store/authSlice";
import { resetTransactions } from "../store/transactionsSlice";
import store from '../store';

const login = async (username: string, password: string): Promise<void> => {
    await API.login(username, password);
    store.dispatch(setAuthenticated(true));
    store.dispatch(resetTransactions());
};

const checkAuth = async (): Promise<boolean> => {
    return await API.checkAuth();
};

export const AuthService = {
    login,
    checkAuth,
};
