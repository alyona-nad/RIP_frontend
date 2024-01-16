/*
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import CartItem from '../../components/CardItem/CardItem';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap'
import { setActiveDyeID } from '../../redux/filterAndActiveDyeID/actions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DyeCard from '../../components/DyeItem/DyeItem';
import {IColorant} from "../../model.tsx"
//import { RootState } from '../../redux/store';
interface CartItem {
  ID_Colorant: number;
  Name: string;
  Price: number;
}

const BasketPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [music, setMusic] = useState<IColorant[]>([])
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/delete-MtM/${localStorage.getItem("ActiveDyeId")}/colorant/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
  
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
  const fetchData = async () => {
    try {
      console.log(`1`);
      const url = `api/list_of_colorants`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      localStorage.setItem("ActiveDyeId", data?.Dyes?.toString() || '');
                dispatch(setActiveDyeID(data?.Dyes));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  fetchData();
}, []);
  const fetchData = async () => {
    try {
      
      const response = await axios.get(`/api/dye/${localStorage.getItem("ActiveDyeId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.Colorants);
      setCartItems(response.data.Colorants);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const removeFromCart = async (removedItem: typeof DyeCard) => {
    try {
      await axios.delete(`/api/delete-MtM/${localStorage.getItem("ActiveDyeId")}/colorant/${removedItem.ID_Colorant}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      await axios.delete(`/api/delete-dye/${localStorage.getItem("ActiveDyeId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/RIP_frontend/");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSend = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirmSend = async () => {
    // Ваша логика отправки данных
    // ...
    try {
        await axios.put(
          `/api/formation-dye/${localStorage.getItem("ActiveDyeId")}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        await axios.post(
            'http://0.0.0.0:5000/',  
            {
              pk: localStorage.getItem("ActiveDyeId"),
            }
          );
        setShowModal(false);
        navigate("/RIP_frontend/")
      } catch (error) {
        setError('Ошибка при отправке формы. Попробуйте позже')
        console.error('Error fetching data:', error);
      }
    // Закрыть модальное окно после успешной отправки
    setShowModal(false);
  };

  const renderCart = () => {
    return (
      <>
        <h2>Корзина</h2>
        <div className="card" style={{ width: '1220px', boxSizing: 'border-box', marginTop: '10px', marginLeft: 0, marginRight: 0 }}>
          <Row xs={4} md={4} className="g-4">
            {cartItems.map((item) => (
              <Col key={item.ID_Colorant}>
                <DyeCard {...item} onRemove={() => handleDelete(item.ID_Colorant)} />
              </Col>
            ))}
          </Row>
        </div>
        <div style={{ marginTop: '10px'}}></div>
        <Button variant="primary" onClick={handleSend}>
          Отправить
        </Button>
        <Button style={{ marginLeft: '70%' }} variant="danger" onClick={handleDeleteCart}>
          Очистить корзину
        </Button>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Подтверждение отправки</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Вы уверены, что хотите отправить данные?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleConfirmSend}>
              Отправить
            </Button>
          </Modal.Footer>
            </Modal>
      </>
    );
  };

  const renderEmptyCart = () => {
    return (
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        <h2>Корзина пуста</h2>
      </div>
    );
  };

  return (
    <div>
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        {cartItems?.length > 0 ? renderCart() : renderEmptyCart()}
      </div>
    </div>
  );
};

export default BasketPage;
*/
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import CartItem from '../../components/CardItem/CardItem';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap'
import { setActiveDyeID } from '../../redux/filterAndActiveDyeID/actions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DyeCard from '../../components/DyeItem/DyeItem';
import {IColorant} from "../../model.tsx"
import { useParams,Link } from 'react-router-dom';

interface CartItem {
  ID_Colorant: number;
  Name: string;
  Price: number;
}

const BasketPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [music, setMusic] = useState<IColorant[]>([])
  const [loading, setLoading] = useState(true); // Добавляем состояние loading

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/delete-MtM/${localStorage.getItem("ActiveDyeId")}/colorant/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/dye/${localStorage.getItem("ActiveDyeId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.Colorants);
      setCartItems(response.data.Colorants);
      setLoading(false); // Устанавливаем loading в false после загрузки данных
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Если произошла ошибка, также устанавливаем loading в false
    }
  };

  const removeFromCart = async (removedItem: typeof DyeCard) => {
    try {
      await axios.delete(`/api/delete-MtM/${localStorage.getItem("ActiveDyeId")}/colorant/${removedItem.ID_Colorant}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      await axios.delete(`/api/delete-dye/${localStorage.getItem("ActiveDyeId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/RIP_frontend/");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSend = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirmSend = async () => {
    // Ваша логика отправки данных
    // ...
    try {
        await axios.put(
          `/api/formation-dye/${localStorage.getItem("ActiveDyeId")}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
          const activeDyeId = localStorage.getItem("ActiveDyeId")
          const ActiveDyeId: number = parseInt(activeDyeId ?? "0", 10)
          console.log(ActiveDyeId)
        await axios.post(
            'http://localhost:5000/',  
            {
              pk: ActiveDyeId,
             
            }
          );
        setShowModal(false);
        navigate("/RIP_frontend/")
      } catch (error) {
        setError('Ошибка при отправке формы. Попробуйте позже')
        console.error('Error fetching data:', error);
      }
    // Закрыть модальное окно после успешной отправки
    setShowModal(false);
  };

  const renderCart = () => {
    return (
      <>
      <div className="breadcrumbs">
        <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/BasketPage">Корзина</Link>
      </div>
        <h2>Корзина</h2>
        <div className="card" style={{ width: '1220px', boxSizing: 'border-box', marginTop: '10px', marginLeft: 0, marginRight: 0 }}>
          <Row xs={4} md={4} className="g-4">
            {cartItems.map((item) => (
              <Col key={item.ID_Colorant}>
                <DyeCard {...item} onRemove={() => handleDelete(item.ID_Colorant)} />
              </Col>
            ))}
          </Row>
        </div>
        <div style={{ marginTop: '10px'}}></div>
        <Button variant="primary" onClick={handleSend}>
          Отправить
        </Button>
        <Button style={{ marginLeft: '70%' }} variant="danger" onClick={handleDeleteCart}>
          Очистить корзину
        </Button>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Подтверждение отправки</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Вы уверены, что хотите отправить данные?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleConfirmSend}>
              Отправить
            </Button>
          </Modal.Footer>
            </Modal>
      </>
    );
  };

  const renderEmptyCart = () => {
    return (
      <>
      <div className="breadcrumbs">
        <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/BasketPage">Корзина</Link>
      </div>
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        <h2>Корзина пуста</h2>
      </div>
      </>
    );
  };

  return (
    <div>
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        {loading ? (
          <p></p>
        ) : (
          <>
            {cartItems?.length > 0 ? renderCart() : renderEmptyCart()}
          </>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
