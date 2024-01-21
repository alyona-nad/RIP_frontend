import { Middleware } from "redux";
import { login, logout, register } from "./authActions";
import { loginSuccess, loginFailure, setRole,updateUserInfo } from "./authSlice";
import axios from "axios";

const API_BASE_URL = "/api";

const authMiddleware: Middleware = (store) => (next) => async (action) => {
    if (login.match(action)) {
        try {
            const { userLogin, password } = action.payload;
            console.log(userLogin, password)
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                "login": userLogin,
                "password": password,
            });

            console.log('Response:', response); // Добавлен вывод

            if (response.status === 200) {
                console.log('loginSuccess');
                store.dispatch(loginSuccess());

                store.dispatch(updateUserInfo(response.data.name))
                const token = response.data.access_token;
                localStorage.setItem("accessToken", token);
                
                store.dispatch(setRole(response.data.role))
                const updatedNumOfCol = 0;
                localStorage.setItem('numOfCol', updatedNumOfCol.toString());
            } else {
                console.log('loginFailure');
                store.dispatch(loginFailure());
            }
        } catch (error) {
            console.log('Error during login');
            console.error("Error during login:", error);
            store.dispatch(loginFailure());
            throw error;
        }
    } else if (logout.match(action)) {
        try {
            // Отправить запрос на сервер для выполнения выхода
            const response = await axios.post(
                `${API_BASE_URL}/auth/logout`,
                {},
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (response.status === 200) {
                console.log('logoutSuccess');
                store.dispatch(loginFailure());
                localStorage.removeItem("accessToken"); // Удаляем токен из локального хранилища
                localStorage.removeItem("numOfCol");
                
            } else {
                console.log('logoutFailure');
                // Может потребоваться диспатчить дополнительные действия в случае неудачного выхода
            }
        } catch (error) {
            console.log('Error during logout');
            console.error("Error during logout:", error);
            // Может потребоваться диспатчить дополнительные действия в случае ошибки
            throw error;
        }
    } else if (register.match(action)) {
        try {
            const { userName,
                userLogin,
                phoneNumber,
                email,
                password, } = action.payload;
            const response = await axios.post(`${API_BASE_URL}/auth/registration`, {
                "name": userName,
                "login": userLogin,
                "PhoneNumber": phoneNumber,
                "email": email,
                "password": password,
            });

            if (response.status === 200) {
                store.dispatch(loginSuccess()); // Dispatch your success action
                const token = response.data.access_token;
                localStorage.setItem("accessToken", token);
                store.dispatch(setRole(response.data.role))
                const updatedNumOfCol = 0;
                localStorage.setItem('numOfCol', updatedNumOfCol.toString());
            } else {
                store.dispatch(loginFailure()); // Dispatch your failure action
            }
        } catch (error) {
            console.error("Error during registration:", error);
            store.dispatch(loginFailure());
            throw error;
        }
    }


    return next(action);
};


export default authMiddleware;