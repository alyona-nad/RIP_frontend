
import React, { FC, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import MusicCard from '../components/ColorantCard/ColorantCard.tsx';
import InputField from '../components/InputField/InputField.tsx';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IColorant, colorants as Colorants } from "../model.tsx";
import CartImg from '../assets/NotEmpty.jpg';
import EmptyCartImg from '../assets/Empty.png';
import { loginSuccess, loginFailure } from '../redux/auth/authSlice';
import { ChangeEvent } from 'react';
import { setActiveDyeID, SetFilter, setNumOfColInDye } from '../redux/filterAndActiveDyeID/actions';
import { RootState } from '../redux/store';
import axios from 'axios';

const API_BASE_URL = "/api";

const MainPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [music, setMusic] = useState<IColorant[]>([]);
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState('');
  const numOfCol = useSelector((state: RootState) => state.filterAndActiveId.numOfCol);
  const Filter = useSelector((state: RootState) => state.filterAndActiveId.Filter);
  const activeDye = useSelector((state: RootState) => state.filterAndActiveId.activeDyeID);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
/*
  const fetchCartData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dye/${localStorage.getItem("ActiveDyeId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении данных корзины');
      }

      const cartData = await response.json();
      dispatch(setActiveDyeID(cartData?.Dyes));
    } catch (error) {
      console.error('Ошибка при загрузке данных корзины:', error);
    }
  };

  const fetchData = async () => {
    try {
      const url = currentFilter
        ? `${API_BASE_URL}/list_of_colorants?filterValue=${currentFilter}`
        : `${API_BASE_URL}/list_of_colorants`;

      let response;
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

      const data = await response.json();
      localStorage.setItem("ActiveDyeId", data?.Dyes?.toString() || '');
      dispatch(setActiveDyeID(data?.Dyes));
      setMusic(data.Colorants);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
*/
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
  //const maxPriceString = e.target.value !== '' ? parseInt(e.target.value).toString() : '';
  dispatch(SetFilter(e.target.value));
};

/*const buttonAddClicked = () => {
  if (!activeRequest) {
      fetchData()
  }
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
/*
  useEffect(() => {
    fetchData();
    fetchCartData();
  }, [currentFilter]);
*/
useEffect(() => {
  fetchData()
  if (window.localStorage.getItem("accessToken")) {
      dispatch(loginSuccess())
  }
  const currentNumOfCol = localStorage.getItem('numOfCons');
  const currentNum = currentNumOfCol ? parseInt(currentNumOfCol, 10) : 0;
  const updatedNumOfCol = currentNum;
  localStorage.setItem('numOfCol', updatedNumOfCol.toString());
  if (updatedNumOfCol != numOfCol) {
      dispatch(setNumOfColInDye(updatedNumOfCol));
  }
}, [dispatch, Filter]);


  return (
    <div className="" style={{ width: '1220px' }}>
      <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/">Каталог</Link>
      </div>
      <div className="filter" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control type="search"  className="me-2" aria-label="Search" value={Filter} onChange={handleFilterChange}>
                </Form.Control>
       {/* <form action="/home" method="get" onSubmit={handleSubmit}>
          <InputField
            /*value={currentFilter}
            setValue={(value) => setCurrentFilter(value)}
            loading={loading}*/
            /*value={Filter}
            setValue={(value) => setCurrentFilter(value)}
            loading={loading}
          />
  </form>*/}
  
        {/*{localStorage.getItem("accessToken") ? (
          activeRequest ? (
            <Link className='cart' to='/RIP_frontend/BasketPage' style={{ marginLeft: 'auto' }}>
              <img src={CartImg} style={{ width: '50px', height: '50px' }} />
            </Link>
          ) : (
            <Link className='cart empty' to='/RIP_frontend/BasketPage' style={{ marginLeft: 'auto' }}>
              <img src={EmptyCartImg} style={{ width: '50px', height: '50px' }} />
            </Link>
          )
          ) : null}*/}
          {/*localStorage.getItem("accessToken")*/ isAuthenticated ? (
  loading ? (
    <p></p>
  ) : (
    <Link className='cart' to={`/RIP_frontend/BasketPage/${activeDye}`} style={{ marginLeft: 'auto' }}>
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


