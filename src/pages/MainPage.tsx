
import React, { FC, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import MusicCard from '../components/ColorantCard/ColorantCard.tsx';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IColorant, colorants as Colorants } from "../model.tsx";
import CartImg from '../assets/NotEmpty.jpg';
import EmptyCartImg from '../assets/Empty.png';
import { loginSuccess, loginFailure, setRole } from '../redux/auth/authSlice';
import { ChangeEvent } from 'react';
import { setActiveDyeID, SetFilter, setNumOfColInDye } from '../redux/filterAndActiveDyeID/actions';
import { RootState } from '../redux/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "/api";

const MainPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [music, setMusic] = useState<IColorant[]>([]);
  const [dataLoaded, setDataLoaded]= useState(false);
  const dispatch = useDispatch();
  //const [currentFilter, setCurrentFilter] = useState('');
  const numOfCol = useSelector((state: RootState) => state.filterAndActiveId.numOfCol);
  const Filter = useSelector((state: RootState) => state.filterAndActiveId.Filter);
  const activeDye = useSelector((state: RootState) => state.filterAndActiveId.activeDyeID);
  const navigate = useNavigate();
  console.log(activeDye)
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
  if (!activeDye) {
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
/*
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
}, [dispatch, numOfCol, Filter]);
*/
useEffect(() => {
  const fetchDataIfNeeded = async () => {
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

    // Проверяем, загружались ли данные ранее
    if (!dataLoaded) {
      fetchData();
      setDataLoaded(true); // Устанавливаем, что данные загружены
    }
  };

  fetchDataIfNeeded(); // Здесь вызывается fetchDataIfNeeded

}, [dispatch, numOfCol, dataLoaded]);

const fetchData = async () => {
  console.log(Filter)
  try {
      const url = Filter ? `${API_BASE_URL}/list_of_colorants?filterValue=${Filter}` 
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
      localStorage.setItem("ActiveDyeId", result?.Dyes?.toString() || '');
      dispatch(setActiveDyeID(result?.Dyes));
      setMusic(result.Colorants);
      setLoading(false);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
  dispatch(SetFilter(e.target.value));
};

/*useEffect(() => {
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
}, [dispatch, Filter]);*/
/*
useEffect(() => {
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

  fetchData(); // Вызывать fetchData только при монтировании

}, [dispatch, numOfCol, Filter]);*/


  return (
    <div className="" style={{ width: '1220px' }}>
      <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/">Каталог</Link>
      </div>
      <div className="filter" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control type="search"  className="me-2" aria-label="Search" value={Filter} onChange={handleFilterChange}>
                </Form.Control>
      {isAuthenticated ? (
          loading ? (
            <p></p>
          ) : (
            <Link
              className='cart'
              to={activeDye ? `/RIP_frontend/BasketPage/${activeDye}` : '#'}
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                if (!activeDye) {
                  // Если нет активной краски, перенаправляем на другую страницу (например, главную)
                  navigate('/RIP_frontend/');
                }
              }}
            >
              {activeDye ? (
                <img src={CartImg} style={{ width: '50px', height: '50px' }} />
              ) : (
                <img src={EmptyCartImg} style={{ width: '50px', height: '50px' }} />
              )}
            </Link>
  )
) : null}

      </div>
      <div className="card" style={{ width: '1220px', boxSizing: 'border-box', marginTop: '10px', marginLeft: 0, marginRight: 0 }}>
        <Row xs={4} md={4} className="g-4">
          {music.map((item, index) => (
            <Col key={index}>
              <MusicCard {...item} onAdd={handleAdd} />
            </Col>
          ))}
        </Row>
      
      </div>
    </div>
  );
};

export default MainPage;
