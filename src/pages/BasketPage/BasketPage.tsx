/*
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
  //const [activeDye, setActiveDye] = useState(Number);
  const [activeDye, setActiveDye] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const { id: id_Dye } = useParams<Record< string, string | undefined>>();
  const [loading, setLoading] = useState(true); 
  //const { id: id_Dye } = useParams<Record<string, string | undefined>>();
  const actualId: number | undefined = id_Dye ? parseInt(id_Dye, 10) : undefined;
  const isMatchingId = id_Dye 
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
    fetchData(/*actualId*//*actualId);
  }, [id_Dye]);

  const fetchData = async (dyeId: /*string*//*number|  undefined) => {
    if ( actualId!=0) {
    try {
      console.log("actualId",actualId);
      if (actualId===undefined ) {
        // Если нет активной краски, перенаправляем на другую страницу (например, главную)
        if(role!=2) {
          navigate("/RIP_frontend/");} else {
            navigate("/RIP_frontend/AdminMainPage")
          }
          
      }
      
      const response = await axios.get(`/api/dye/${dyeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.Colorants);
      setCartItems(response.data.Colorants);
      setActiveDye(dyeId)
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); 
    }
  } else {
    if(role!=2) {
      navigate("/RIP_frontend/");} else {
        navigate("/RIP_frontend/AdminMainPage")
      }
  }
  };


  const handleDeleteCart = async () => {
    try {
      await axios.delete(`/api/delete-dye/${/*localStorage.getItem("ActiveDyeId"*//*activeDye}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if(role!=2) {
      navigate("/RIP_frontend/");} else {
        navigate("/RIP_frontend/AdminMainPage")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  const handleConfirmSend = async () => {
    try {
        await axios.put(
          `/api/formation-dye/${/*localStorage.getItem("ActiveDyeId")*//*activeDye}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
          const activeDyeId = /*localStorage.getItem("ActiveDyeId")*//*activeDye
          //const ActiveDyeId: number = parseInt(activeDyeId  ?? "0", 10)
          console.log(activeDyeId)
          if(role!=2) {
            navigate("/RIP_frontend/");} else {
              navigate("/RIP_frontend/AdminMainPage")
            }
        await axios.post(
            'http://localhost:5000/',  
            {
              pk: activeDyeId,
             
            }
          );
        //setShowModal(false);
        
      } catch (error) {
        setError('Ошибка при отправке формы. Попробуйте позже')
        console.error('Error fetching data:', error);
      }
    setShowModal(false);
  };

  const renderBreadcrumbs = (actualId: Number | undefined) => {
    const catalogLink = <Link to="/RIP_frontend/">Каталог</Link>;
    const dyesLink = <Link to="/RIP_frontend/dyes">Заявки</Link>;
    const dyesLinkAdmin = <Link to="/RIP_frontend/dyesAdmin">Заявки</Link>;
    const basketLink = <Link to="/RIP_frontend/BasketPage">Корзина</Link>;
    const catalogLinkAdmin = <Link to="/RIP_frontend/AdminMainPage">Каталог</Link>;
  if(role!=2){
    return (
      <div className="breadcrumbs">
        
        {actualId === /*localStorage.getItem("ActiveDyeId")*//*activeDye ? (
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
          
          {actualId === activeDye ? (
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
              <Col  key={item.ID_Colorant} style={{ minWidth: '210px'}}>
                <DyeCard {...item} onRemove={() => handleDelete(item.ID_Colorant)} isMatchingId={true}  />
              </Col>
            ))}
          </Row>
        </div>
        <div style={{ marginTop: '10px'}}></div>
          {activeDye === actualId && (
            <>
              <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#fff', borderColor: '#28a745'}} onClick={handleConfirmSend}>
                Отправить
              </Button>
              <Button style={{ marginLeft: '70%',color: '#dc3545', backgroundColor: '#fff', borderColor: '#dc3545'}}variant="danger"  onClick={handleDeleteCart}>
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
            {cartItems?.length > 0 ? renderCart() : (role === 2 ? navigate('/RIP_frontend/AdminMainPage') : navigate('/RIP_frontend'))}
          </>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
*/

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
    if ( actualId!="0") {
    try {
      console.log("actualId",actualId);
      if (actualId==="" ) {
        // Если нет активной краски, перенаправляем на другую страницу (например, главную)
        if(role!=2) {
          navigate("/RIP_frontend/");} else {
            navigate("/RIP_frontend/AdminMainPage")
          }
          
      }
      
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
  } else {
    if(role!=2) {
      navigate("/RIP_frontend/");} else {
        navigate("/RIP_frontend/AdminMainPage")
      }
  }
  };


  const handleDeleteCart = async () => {
    try {
      await axios.delete(`/api/delete-dye/${localStorage.getItem("ActiveDyeId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if(role!=2) {
      navigate("/RIP_frontend/");} else {
        navigate("/RIP_frontend/AdminMainPage")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
          if(role!=2) {
            navigate("/RIP_frontend/");} else {
              navigate("/RIP_frontend/AdminMainPage")
            }
        await axios.post(
            'http://localhost:5000/',  
            {
              pk: ActiveDyeId,
             
            }
          );
        //setShowModal(false);
        
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
  if(role!=2){
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
              <Col  key={item.ID_Colorant} style={{ minWidth: '210px'}}>
                <DyeCard {...item} onRemove={() => handleDelete(item.ID_Colorant)} isMatchingId={isMatchingId}  />
              </Col>
            ))}
          </Row>
        </div>
        <div style={{ marginTop: '10px'}}></div>
          {id_Dye === localStorage.getItem("ActiveDyeId") && (
            <>
              <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#fff', borderColor: '#28a745'}} onClick={handleConfirmSend}>
                Отправить
              </Button>
              <Button style={{ marginLeft: '70%',color: '#dc3545', backgroundColor: '#fff', borderColor: '#dc3545'}}variant="danger"  onClick={handleDeleteCart}>
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
            {cartItems?.length > 0 ? renderCart() : (role === 2 ? navigate('/RIP_frontend/AdminMainPage') : navigate('/RIP_frontend'))}
          </>
        )}
      </div>
    </div>
  );
};

export default BasketPage;