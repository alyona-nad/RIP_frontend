/*
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { RootState } from '../../redux/store';
import { login } from "../../redux/auth/authActions";


const LoginPage = () => {
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state: RootState) => state.auth.role)
    localStorage.setItem("role", role.toString())
    useEffect(() => {
        // Проверка, если пользователь уже аутентифицирован
        if (role === 1) {
            navigate("/RIP_frontend/");
        } else if (role === 2) {
            navigate("/RIP_frontend/AdminMainPage");
        }
    }, [role, navigate]);

    /*const handleLogin = async (userLogin: string, password: string) => {
        try {
            await dispatch(login({ userLogin, password }));
            
    if (role === 1) {
      navigate("/RIP_frontend/");
    } else if (role === 2) {
      navigate("/RIP_frontend/AdminMainPage");
    }
            localStorage.setItem("name", userLogin);
          } catch (error) {
            console.error("Error during login:", error);
            setError("Неверный логин или пароль");
          }
    };*/
    /*
    const handleLogin = async (userLogin: string, password: string) => {
        try {
            await dispatch(login({ userLogin, password }));
            // Роль пользователя будет установлена после успешного входа
        } catch (error) {
            console.error("Error during login:", error);
            setError("Неверный логин или пароль");
        }
    };
    return (
        <div>
          
            <div className='container login-page'>
                <h1 className='small-h1'>Авторизация</h1>
                <Form className='login-form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите логин"
                            value={userLogin}
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {error && <div className="error-message">{error}</div>}
    <Button 
                        variant="primary" 
                        type="button"
                        onClick={() => handleLogin(userLogin, password)}>
                        Войти
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage;*/
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { RootState } from '../../redux/store';
import { login } from "../../redux/auth/authActions";

const LoginPage = () => {
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state: RootState) => state.auth.role)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    localStorage.setItem("role", role.toString())
   
    useEffect(() => {
        if (isAuthenticated) {
            if (role === 1) {
                navigate("/RIP_frontend/");
              } else if (role === 2) {
                navigate("/RIP_frontend/AdminMainPage");
              }
        }
      }, [isAuthenticated, navigate]);

    const handleLogin = async (userLogin: string, password: string) => {
        try {
            await dispatch(login({ userLogin, password }));
            
    /*if (role === 1) {
      navigate("/RIP_frontend/");
    } else if (role === 2) {
      navigate("/RIP_frontend/AdminMainPage");
    }*/
            localStorage.setItem("name", userLogin);
          } catch (error) {
            console.error("Error during login:", error);
            setError("Неверный логин или пароль");
          }
    };
    
    
    return (
        <div>
          
            <div className='container login-page'>
                <h1 className='small-h1'>Авторизация</h1>
                <Form className='login-form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите логин"
                            value={userLogin}
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {error && <div className="error-message">{error}</div>}
                    <Button 
                    variant="primary" 
                    type="button"
                    onClick={() => handleLogin(userLogin, password)}>
                        Войти
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage;