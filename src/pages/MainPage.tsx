/*
import React, { FC, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import MusicCard from '../components/ColorantCard/ColorantCard.tsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IColorant, colorants as Colorants } from "../model.tsx";
import CartImg from '../assets/NotEmpty.jpg';
import EmptyCartImg from '../assets/Empty.png';
import { loginSuccess, loginFailure, setRole } from '../redux/auth/authSlice';
import { ChangeEvent } from 'react';
import { /*setActiveDyeID,*/ /*SetSearchFilter, setNumOfColInDye } from '../redux/filterAndActiveDyeID/actions';
import { RootState } from '../redux/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const API_BASE_URL = "/api";

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
const MainPage: FC = () => {
  const [data, setData] = useState<Data | null>({ Dyes: 0, Colorants: [] });
  const [loading, setLoading] = useState(true);
  const [activeDye, setActiveDye] = useState(Number);
  //const [activeDye, setActiveDye] = useState(Number);
  const [music, setMusic] = useState<IColorant[]>([]);
  //const [dataLoaded, setDataLoaded]= useState(false);
  const dispatch = useDispatch();
  //const [currentFilter, setCurrentFilter] = useState('');
  const numOfCol = useSelector((state: RootState) => state.filterAndActiveId.numOfCol);
  const SearchFilter = useSelector((state: RootState) => state.filterAndActiveId.SearchFilter);
  //const activeDye = useSelector((state: RootState) => state.filterAndActiveId.activeDyeID);
  const navigate = useNavigate();
  //const ActiveDyeId= useState(Number);
 // console.log(activeDye)
 const role = useSelector((state: RootState) => state.auth.role)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  //const userRole = useSelector((state: RootState) => state.auth.role)
/*
  const handleAdd = async (id: number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/colorant/${id}`,
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
*/
/*
const fetchDataAndCheckActiveDye = async () => {
  fetchData(); // Здесь только вызов fetchData
  if (/*activeDye*//*data?.Dyes || /*activeDye===0*//*data?.Dyes===0) {
    // Если нет активной краски, перенаправляем на другую страницу (например, главную)
    navigate('/RIP_frontend/');
  }
};

const handleAdd = async (id: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/colorant/${id}`,
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
      fetchDataAndCheckActiveDye(); // Здесь только вызов fetchDataAndCheckActiveDye
    } else {
      throw new Error('Ошибка при добавлении 1');
    }

    console.log('Добавлено успешно');
  } catch (error) {
    console.error('Ошибка при добавлении:', error);
  }
};

useEffect(() => {
  fetchDataAndCheckActiveDye(); // Здесь только вызов fetchDataAndCheckActiveDye
  if (window.localStorage.getItem("accessToken")) {
    dispatch(loginSuccess());
  }
  const currentNumOfCol = localStorage.getItem('numOfCol');
  const currentNum = currentNumOfCol ? parseInt(currentNumOfCol, 10) : 0;
  const updatedNumOfCol = currentNum;
  localStorage.setItem('numOfCol', updatedNumOfCol.toString());
  if (updatedNumOfCol !== numOfCol) {
    dispatch(setNumOfColInDye(updatedNumOfCol));
  }
}, [dispatch, numOfCol, SearchFilter]);



const fetchData = async () => {
  console.log(localStorage.getItem("ActiveDyeId"))
  try {
      const url = SearchFilter ? `${API_BASE_URL}/list_of_colorants?filterValue=${SearchFilter}` 
      : `${API_BASE_URL}/list_of_colorants`;
      
      let response
      if (!localStorage.getItem("accessToken")) {
          response = await fetch(url);
      } else {
          response = await fetch(url, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
          });

      }
      if (!response.ok) {
          throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
      }


      const result = await response.json();
      //ActiveDyeId=result?.Dyes
      //localStorage.setItem("ActiveDyeId", result?.Dyes?.toString() || '');
      setData(result)
      setActiveDye(result?.Dyes)
      //dispatch(setActiveDyeID(result?.Dyes));
      setMusic(result.Colorants);
      setLoading(false);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(SetSearchFilter(e.target.value));
};



  return (
    <div className="" style={{ width: '1220px' }}>
      <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/">Каталог</Link>
      </div>
      <div className="filter" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control type="search"  className="me-2" aria-label="Search" value={SearchFilter} onChange={handleFilterChange}>
                </Form.Control>
      {isAuthenticated ? (
          loading ? (
            <p></p>
          ) : (
            <Link
              className='cart'
              to={/*activeDye && activeDye!=0 *//*data?.Dyes && data.Dyes!=0 ? `/RIP_frontend/BasketPage/${data?.Dyes}` : '#'}
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                if ( !data?.Dyes || data?.Dyes===0) {
                  console.log('Пустая корзина')
                }
              }}
            >
              {data?.Dyes && data?.Dyes!=0 ? (
                <img src={CartImg} style={{ width: '50px', height: '50px' }} />
              ) : (
                <img src={EmptyCartImg} style={{ width: '50px', height: '50px' }} />
              )}
            </Link>
  )
) : null}

      </div>
      {role === 2 && ( // Добавлен блок для проверки роли
              <Link to="/RIP_frontend/AdminMainPage" className='cart' style={{ marginLeft: '10px' }}>
                <Button variant="primary" style={{ color: '#007bff', backgroundColor: '#fff', borderColor: '#007bff' }}>
                  Красители табличкой
                </Button>
              </Link>
            )}
      <div className="card" style={{ width: '1220px', boxSizing: 'border-box', marginTop: '10px', marginLeft: 0, marginRight: 0 }}>
        <Row xs={4} md={4} className="g-4">
          {music.map((item, index) => (
            <Col key={index} style={{ minWidth: '210px'}}>
              <MusicCard {...item} onAdd={handleAdd} />
            </Col>
          ))}
        </Row>
      
      </div>
    </div>
  );
};

export default MainPage;
*/

import React, { FC, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import MusicCard from '../components/ColorantCard/ColorantCard.tsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IColorant, colorants as Colorants } from "../model.tsx";
import CartImg from '../assets/NotEmpty.jpg';
import EmptyCartImg from '../assets/Empty.png';
import { loginSuccess, loginFailure, setRole } from '../redux/auth/authSlice';
import { ChangeEvent } from 'react';
import { /*setActiveDyeID,*/ SetSearchFilter, setNumOfColInDye } from '../redux/filterAndActiveDyeID/actions';
import { RootState } from '../redux/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const API_BASE_URL = "/api";
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
const MainPage: FC = () => {
  const [data, setData] = useState<Data | null>({ Dyes: 0, Colorants: [] });
  const [loading, setLoading] = useState(true);
  const [music, setMusic] = useState<IColorant[]>([]);
  const [dataLoaded, setDataLoaded]= useState(false);
  const dispatch = useDispatch();
  //const [currentFilter, setCurrentFilter] = useState('');
  const numOfCol = useSelector((state: RootState) => state.filterAndActiveId.numOfCol);
  const SearchFilter = useSelector((state: RootState) => state.filterAndActiveId.SearchFilter);
  //const activeDye = useSelector((state: RootState) => state.filterAndActiveId.activeDyeID);
  const navigate = useNavigate();
  //const ActiveDyeId= useState(Number);
 // console.log(activeDye)
 const role = useSelector((state: RootState) => state.auth.role)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  //const userRole = useSelector((state: RootState) => state.auth.role)
/*
  const handleAdd = async (id: number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/colorant/${id}`,
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
*/

const fetchDataAndCheckActiveDye = async () => {
  fetchData(); // Здесь только вызов fetchData
  if (!data?.Dyes || data?.Dyes===0) {
    // Если нет активной краски, перенаправляем на другую страницу (например, главную)
    navigate('/RIP_frontend/');
  }
};

const handleAdd = async (id: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/colorant/${id}`,
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
      fetchDataAndCheckActiveDye(); // Здесь только вызов fetchDataAndCheckActiveDye
    } else {
      throw new Error('Ошибка при добавлении 1');
    }

    console.log('Добавлено успешно');
  } catch (error) {
    console.error('Ошибка при добавлении:', error);
  }
};

useEffect(() => {
  fetchDataAndCheckActiveDye(); // Здесь только вызов fetchDataAndCheckActiveDye
  if (window.localStorage.getItem("accessToken")) {
    dispatch(loginSuccess());
  }
  const currentNumOfCol = localStorage.getItem('numOfCol');
  const currentNum = currentNumOfCol ? parseInt(currentNumOfCol, 10) : 0;
  const updatedNumOfCol = currentNum;
  localStorage.setItem('numOfCol', updatedNumOfCol.toString());
  if (updatedNumOfCol !== numOfCol) {
    dispatch(setNumOfColInDye(updatedNumOfCol));
  }
}, [dispatch, numOfCol, SearchFilter]);



const fetchData = async () => {
  console.log(localStorage.getItem("ActiveDyeId"))
  try {
      const url = SearchFilter ? `${API_BASE_URL}/list_of_colorants?filterValue=${SearchFilter}` 
      : `${API_BASE_URL}/list_of_colorants`;
      
      let response
      if (!localStorage.getItem("accessToken")) {
          response = await fetch(url);
      } else {
          response = await fetch(url, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
          });

      }
      if (!response.ok) {
          throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
      }


      const result = await response.json();
      //ActiveDyeId=result?.Dyes
      setData(result)
      localStorage.setItem("ActiveDyeId", result?.Dyes?.toString() || '');
      //dispatch(setActiveDyeID(result?.Dyes));
      setMusic(result.Colorants);
      setLoading(false);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(SetSearchFilter(e.target.value));
};



  return (
    <div className="" style={{ width: '1220px' }}>
      <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/">Каталог</Link>
      </div>
      <div className="filter" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control type="search"  className="me-2" aria-label="Search" value={SearchFilter} onChange={handleFilterChange}>
                </Form.Control>
      {isAuthenticated ? (
          loading ? (
            <p></p>
          ) : (
            <Link
              className='cart'
              to={/*activeDye && activeDye>0 */ data?.Dyes && data?.Dyes!=0 ? `/RIP_frontend/BasketPage/${data?.Dyes}` : '#'}
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                if (/*!activeDye || activeDye===0*/ !data?.Dyes || data?.Dyes===0) {
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

      </div>
      {role === 2 && ( // Добавлен блок для проверки роли
              <Link to="/RIP_frontend/AdminMainPage" className='cart' style={{ marginLeft: '10px' }}>
                <Button variant="primary" style={{ color: '#007bff', backgroundColor: '#fff', borderColor: '#007bff' }}>
                  Красители табличкой
                </Button>
              </Link>
            )}
      <div className="card" style={{ width: '1220px', boxSizing: 'border-box', marginTop: '10px', marginLeft: 0, marginRight: 0 }}>
        <Row xs={4} md={4} className="g-4">
          {music.map((item, index) => (
            <Col key={index} style={{ minWidth: '210px'}}>
              <MusicCard {...item} onAdd={handleAdd} />
            </Col>
          ))}
        </Row>
      
      </div>
    </div>
  );
};

export default MainPage;