
import React, { useState, useEffect } from 'react';
import CartItem from '../../components/CardItem/CardItem';
import { Button, Modal,Form } from 'react-bootstrap';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DyeCard from '../../components/DyeItem/DyeItem';
import { useParams,Link } from 'react-router-dom';
import { RootState } from '../../redux/store';

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
  const { id: id_Dye } = useParams<Record<string, string | undefined>>();
  const [loading, setLoading] = useState(true); 
  const actualId: string = id_Dye || "";
  const isMatchingId = id_Dye === localStorage.getItem("ActiveDyeId");
  const role = useSelector((state: RootState) => state.auth.role)
  const handleDelete = async (id1: number) => {
    try {
      await axios.delete(`/api/delete-MtM/${localStorage.getItem("ActiveDyeId")}/colorant/${id1}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      fetchData(actualId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(actualId);
  }, [id_Dye]);

  const fetchData = async (dyeId: string ) => {
    try {
      const response = await axios.get(`/api/dye/${dyeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.Colorants);
      setCartItems(response.data.Colorants);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); 
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
    setShowModal(false);
  };

  const renderBreadcrumbs = (actualId: string | undefined) => {
    const catalogLink = <Link to="/RIP_frontend/">Каталог</Link>;
    const dyesLink = <Link to="/RIP_frontend/dyes">Заявки</Link>;
    const dyesLinkAdmin = <Link to="/RIP_frontend/dyesAdmin">Заявки</Link>;
    const basketLink = <Link to="/RIP_frontend/BasketPage">Корзина</Link>;
    const catalogLinkAdmin = <Link to="/RIP_frontend/AdminMainPage">Каталог</Link>;
  if(role===1){
    return (
      <div className="breadcrumbs">
        
        {actualId === localStorage.getItem("ActiveDyeId") ? (
          <>
            {catalogLink}/{basketLink}
          </>
        ) : (
          <>
            {catalogLink}/{dyesLink}/{basketLink}
          </>
        )}
      </div>
    );} else if (role===2) {
      return (
        <div className="breadcrumbs">
          
          {actualId === localStorage.getItem("ActiveDyeId") ? (
            <>
              {catalogLinkAdmin}/{basketLink}
            </>
          ) : (
            <>
              {catalogLinkAdmin}/{dyesLinkAdmin}/{basketLink}
            </>
          )}
        </div>
      );
    }
  };

  const renderCart = () => {
    return (
      <>
    {renderBreadcrumbs(actualId)}
        <h2>Корзина</h2>
        <div className="card" style={{ width: '1220px', boxSizing: 'border-box', marginTop: '10px', marginLeft: 0, marginRight: 0 }}>
          <Row xs={4} md={4} className="g-4">
            {cartItems.map((item) => (
              <Col key={item.ID_Colorant}>
                <DyeCard {...item} onRemove={() => handleDelete(item.ID_Colorant)} isMatchingId={isMatchingId}  />
              </Col>
            ))}
          </Row>
        </div>
        <div style={{ marginTop: '10px'}}></div>
          {id_Dye === localStorage.getItem("ActiveDyeId") && (
            <>
              <Button variant="primary" onClick={handleConfirmSend}>
                Отправить
              </Button>
              <Button style={{ marginLeft: '70%' }} variant="danger" onClick={handleDeleteCart}>
                Очистить корзину
              </Button>
            </>
          )}
        
            
      </>
    );
  };

  const renderEmptyCart = () => {
    if (role===1) {
    return (
      <>
      <div className="breadcrumbs">
        <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/BasketPage">Корзина</Link>
      </div>
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        <h2>Корзина пуста</h2>
      </div>
      </>
    );} else if (role===2){
      return (
        <>
        <div className="breadcrumbs">
          <Link to="/RIP_frontend/AdminMainPage">Каталог</Link>/<Link to="/RIP_frontend/BasketPage">Корзина</Link>
        </div>
        <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
          <h2>Корзина пуста</h2>
        </div>
        </>
      );
    }
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
