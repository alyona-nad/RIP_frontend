/*
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
//import Navbar from '../../widgets/Navbar/Navbar';
import Loader from '../../components/Loader';
import Table from 'react-bootstrap/Table';
import { Form, Button } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {/*setActiveDyeID,*/ /*SetSearchFilter,setNumOfColInDye } from '../../redux/filterAndActiveDyeID/actions';
import { loginSuccess, setRole } from '../../redux/auth/authSlice';
import axios from 'axios';
import CartImg from '../../assets/NotEmpty.jpg';
import EmptyCartImg from '../../assets/Empty.png';


interface Data {
    Dyes: number;
    Colorants: {
        ID_Colorant: number;
        Name: string;
        Description: string;
        Properties:string
        Image: string;
        Status: string;
    }[];
}

const AdminMainPage: React.FC = () => {
    const [data, setData] = useState<Data | null>({ Dyes: 0, Colorants: [] });
    const dispatch = useDispatch();
    const SearchFilter = useSelector((state: RootState) => state.filterAndActiveId.SearchFilter);
    const [activeDye, setActiveDye] = useState(Number);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(true);
    const numOfCol = useSelector((state: RootState) => state.filterAndActiveId.numOfCol);
    const handleAdd = async (id: number) => {
        try {
          const response = await axios.post(
            `/api/colorant/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          if (response.status === 200) {
            console.log('Обработано');
            fetchData();
          } else {
            throw new Error('Ошибка при добавлении 1');
          }
    
          console.log('Добавлено успешно');
        } catch (error) {
          console.error('Ошибка при добавлении:', error);
        }
      };

      
    const fetchData = async () => {
        console.log(SearchFilter)
        try {
            const url = SearchFilter ? `/api/list_of_colorants?filterValue=${SearchFilter}` 
      : `/api/list_of_colorants`;
            let response
            if (!localStorage.getItem("accessToken")) {
                response = await axios.get(url)
            }
            else {
                response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
            }
            const result = response?.data;
            //setActiveDye(result?.Dyes)
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('ошибка при выполнении запроса:', error);
        }
    };

    const handleDelete = async (colorantId: number) => {
        try {
            await axios.delete(
                `/api/delete-service/${colorantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetSearchFilter(e.target.value));
    };

    useEffect(() => {
        fetchData()
        if (window.localStorage.getItem("accessToken")) {
            dispatch(loginSuccess())
        }
        const currentNumOfCol = localStorage.getItem('numOfCol');
        const currentNum = currentNumOfCol ? parseInt(currentNumOfCol, 10) : 0;
        const updatedNumOfCol = currentNum;
        localStorage.setItem('numOfCol', updatedNumOfCol.toString());
        if (updatedNumOfCol != numOfCol) {
            dispatch(setNumOfColInDye(updatedNumOfCol));
        }
      }, [dispatch, SearchFilter]);
      console.log('activeDye:', data?.Dyes);

    return (
        <div>
            
            <div style={{ marginLeft: "5%", marginTop: "1%" }}>
            <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/AdminMainPage">Каталог</Link>
      </div>
               
                <div className="filter" style={{ display: 'flex', alignItems: 'center' }}></div>
                    <Form.Control type="search"  className="me-2" aria-label="Search" value={SearchFilter} onChange={handleChange}>
                </Form.Control>
                
                { isAuthenticated ? (
  loading ? (
    <p></p>
  ) : (
    
      <Link className='cart' to={/*activeDye && activeDye>0*//*data?.Dyes && data?.Dyes!=0 ? `/RIP_frontend/BasketPage/${data?.Dyes}` : '#'}
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                if (/*!activeDye || activeDye===0*//*!data?.Dyes || data?.Dyes===0) {
                  // Если нет активной краски, перенаправляем на другую страницу (например, главную)
                  console.log('Пустая корзина')
                  //navigate('/RIP_frontend/');
                }
              }}
            >
              {/*activeDye && activeDye>0*//*data?.Dyes && data?.Dyes!=0 ? (
                <img src={CartImg} style={{ width: '50px', height: '50px' }} />
              ) : (
                <img src={EmptyCartImg} style={{ width: '50px', height: '50px' }} />
              )}
            </Link>
  )
) : null}
 <Link to="/RIP_frontend/" className='cart' style={{ marginLeft: '10px' }}>
            <Button variant="primary" style={{ color: '#007bff', backgroundColor: '#fff', borderColor: '#007bff' }}>
              Красители карточками
            </Button>
          </Link>
            </div>
            {!data || data?.Colorants.length === 0 ? <Loader />
                : <div style={{ margin: '5% 10% 0 10%' }}>
                    <div className='table-responsive'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th key={'Name'}>Название</th>
                                <th key={'Desc'}>Описание</th>
                                <th key={'Img'}>Изображение</th>
                                <th key={'Prop'}>Свойства</th>
                                <th key={'Status'}>Статус</th>
                                <th key={'Add'}>Добавить</th>
                                <th key={'Edit'}>Редактирование</th>
                                <th key={'Delete'}>Удаление</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.Colorants.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Name}</td>
                <td>{(item.Description)}</td>
                <td>{(item.Image)}</td>
                <td>{(item.Properties)}</td>
                <td>{(item.Status)}</td>
                <td>
                                {item.Status === 'Действует' && (
                                    <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#ececec', borderColor: '#28a745'}} onClick={() => { handleAdd(item.ID_Colorant) }}>
                                        Добавить
                                    </Button>
                                )}
                            </td>
                                    <td>
                                        <Link to={`/RIP_frontend/colorant-edition/${item.ID_Colorant}/`}>
                                        <Button variant="primary" style={{ color: '#007bff', backgroundColor: '#ececec', borderColor: '#007bff'}}>
                                            Редактировать
                                        </Button>
                                        </Link>
                                    </td>
                                    <td>
                                    {item.Status === 'Действует' && (
                                        <Button variant="danger" style={{ color: '#dc3545', backgroundColor: '#ececec', borderColor: '#dc3545'}} onClick={() => { handleDelete(item.ID_Colorant) }}>
                                        Удалить
                                    </Button>
                                    )}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                    <Link className='add-colorant' to={"/RIP_frontend/colorant-creation"}>
                    <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#fff', borderColor: '#28a745'}}>
                                            Добавить
                                        </Button>
                    </Link>
                </div>}
        </div>
    );
}

export default AdminMainPage;*/

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
//import Navbar from '../../widgets/Navbar/Navbar';
import Loader from '../../components/Loader';
import Table from 'react-bootstrap/Table';
import { Form, Button } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {/*setActiveDyeID,*/ SetSearchFilter,setNumOfColInDye } from '../../redux/filterAndActiveDyeID/actions';
import { loginSuccess, setRole } from '../../redux/auth/authSlice';
import axios from 'axios';
import CartImg from '../../assets/NotEmpty.jpg';
import EmptyCartImg from '../../assets/Empty.png';


interface Data {
    Dyes: number;
    Colorants: {
        ID_Colorant: number;
        Name: string;
        Description: string;
        Properties:string
        Image: string;
        Status: string;
    }[];
}

const AdminMainPage: React.FC = () => {
    const [data, setData] = useState<Data | null>({ Dyes: 0, Colorants: [] });
    const dispatch = useDispatch();
    const SearchFilter = useSelector((state: RootState) => state.filterAndActiveId.SearchFilter);
    //const activeDye = useSelector((state: RootState) => state.filterAndActiveId.activeDyeID);
    //console.log(activeDye)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(true);
    const numOfCol = useSelector((state: RootState) => state.filterAndActiveId.numOfCol);
    const handleAdd = async (id: number) => {
        try {
          const response = await axios.post(
            `/api/colorant/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          if (response.status === 200) {
            console.log('Обработано');
            fetchData();
          } else {
            throw new Error('Ошибка при добавлении 1');
          }
    
          console.log('Добавлено успешно');
        } catch (error) {
          console.error('Ошибка при добавлении:', error);
        }
      };

      
    const fetchData = async () => {
        console.log(SearchFilter)
        try {
            const url = SearchFilter ? `/api/list_of_colorants?filterValue=${SearchFilter}` 
      : `/api/list_of_colorants`;
            let response
            if (!localStorage.getItem("accessToken")) {
                response = await axios.get(url)
            }
            else {
                response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
            }
            const result = response?.data;
            //localStorage.setItem("ActiveDyeId", result?.Dyes?.toString() || '');
      //dispatch(setActiveDyeID(result?.Dyes));
            console.log(result);
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('ошибка при выполнении запроса:', error);
        }
    };

    const handleDelete = async (colorantId: number) => {
        try {
            await axios.delete(
                `/api/delete-service/${colorantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetSearchFilter(e.target.value));
    };

    useEffect(() => {
        fetchData()
        if (window.localStorage.getItem("accessToken")) {
            dispatch(loginSuccess())
        }
        const currentNumOfCol = localStorage.getItem('numOfCol');
        const currentNum = currentNumOfCol ? parseInt(currentNumOfCol, 10) : 0;
        const updatedNumOfCol = currentNum;
        localStorage.setItem('numOfCol', updatedNumOfCol.toString());
        if (updatedNumOfCol != numOfCol) {
            dispatch(setNumOfColInDye(updatedNumOfCol));
        }
      }, [dispatch, SearchFilter]);
      console.log('activeDye:', localStorage.getItem("ActiveDyeId"));

    return (
        <div>
            
            <div style={{ marginLeft: "5%", marginTop: "1%" }}>
            <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/AdminMainPage">Каталог</Link>
      </div>
               
                <div className="filter" style={{ display: 'flex', alignItems: 'center' }}></div>
                    <Form.Control type="search"  className="me-2" aria-label="Search" value={SearchFilter} onChange={handleChange}>
                </Form.Control>
                
                { isAuthenticated ? (
  loading ? (
    <p></p>
  ) : (
    
      <Link className='cart' to={/*activeDye && activeDye>0*/data?.Dyes && data?.Dyes!=0 ? `/RIP_frontend/BasketPage/${data?.Dyes}` : '#'}
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                if (/*!activeDye || activeDye===0*/!data?.Dyes || data?.Dyes===0) {
                  // Если нет активной краски, перенаправляем на другую страницу (например, главную)
                  console.log('Пустая корзина')
                  //navigate('/RIP_frontend/');
                }
              }}
            >
              {/*activeDye && activeDye>0*/data?.Dyes && data?.Dyes!=0 ? (
                <img src={CartImg} style={{ width: '50px', height: '50px' }} />
              ) : (
                <img src={EmptyCartImg} style={{ width: '50px', height: '50px' }} />
              )}
            </Link>
  )
) : null}
 <Link to="/RIP_frontend/" className='cart' style={{ marginLeft: '10px' }}>
            <Button variant="primary" style={{ color: '#007bff', backgroundColor: '#fff', borderColor: '#007bff' }}>
              Красители карточками
            </Button>
          </Link>
            </div>
            {!data || data?.Colorants.length === 0 ? <Loader />
                : <div style={{ margin: '5% 10% 0 10%' }}>
                    <div className='table-responsive'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th key={'Name'}>Название</th>
                                <th key={'Desc'}>Описание</th>
                                <th key={'Img'}>Изображение</th>
                                <th key={'Prop'}>Свойства</th>
                                <th key={'Status'}>Статус</th>
                                <th key={'Add'}>Добавить</th>
                                <th key={'Edit'}>Редактирование</th>
                                <th key={'Delete'}>Удаление</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.Colorants.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Name}</td>
                <td>{(item.Description)}</td>
                <td>{(item.Image)}</td>
                <td>{(item.Properties)}</td>
                <td>{(item.Status)}</td>
                <td>
                                {item.Status === 'Действует' && (
                                    <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#ececec', borderColor: '#28a745'}} onClick={() => { handleAdd(item.ID_Colorant) }}>
                                        Добавить
                                    </Button>
                                )}
                            </td>
                                    <td>
                                        <Link to={`/RIP_frontend/colorant-edition/${item.ID_Colorant}/`}>
                                        <Button variant="primary" style={{ color: '#007bff', backgroundColor: '#ececec', borderColor: '#007bff'}}>
                                            Редактировать
                                        </Button>
                                        </Link>
                                    </td>
                                    <td>
                                    {item.Status === 'Действует' && (
                                        <Button variant="danger" style={{ color: '#dc3545', backgroundColor: '#ececec', borderColor: '#dc3545'}} onClick={() => { handleDelete(item.ID_Colorant) }}>
                                        Удалить
                                    </Button>
                                    )}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                    <Link className='add-colorant' to={"/RIP_frontend/colorant-creation"}>
                    <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#fff', borderColor: '#28a745'}}>
                                            Добавить
                                        </Button>
                    </Link>
                </div>}
        </div>
    );
}

export default AdminMainPage;
