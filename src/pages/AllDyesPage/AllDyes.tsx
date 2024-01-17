/*
import { Link } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDyes } from '../../redux/dyes/dyesActions';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { setStartDateFilter, setEndDateFilter, setStatusFilter, setUserFilter } from '../../redux/dyeFilters/actions';
import axios from 'axios';

interface Dye {
  Id: number;
  Status: string;
  StartDate: string;
  FormationDate: string;
  EndDate: string;
  User: string;
  ModeratorName: string;
  Name: string;
  Price: string;
  
}

const AllDyesPage = () => {
  const dispatch = useDispatch();
  const dyes = useSelector((state: RootState) => state.dye.data);
  const status = useSelector((state: RootState) => state.dye.status);
  const role = useSelector((state: RootState) => state.auth.role)
  const startDate = useSelector((state: RootState) => state.dyeFilters.startDate);
    const endDate = useSelector((state: RootState) => state.dyeFilters.endDate);
    
    const [dye, setDyes] = useState<Dye[] | null>(null);
    const user = useSelector((state: RootState) => state.dyeFilters.user);
    const [localUser, setLocalUser] = useState(user);
  const formattedTime = (timestamp: string) => {
    if (typeof timestamp !== 'string') {
      return "Не установлено";
    }

    if (timestamp.includes('0001-01-01')) {
      return "Не установлено";
    }

    

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Date(timestamp).toLocaleDateString('ru-RU', options);

    return formattedDate;
  };
  /*useEffect(() => {
    setLocalUser(user)
    console.log(localUser)
}, [user])
  useEffect(() => {
    dispatch(getAllDyes());
  }, [dispatch]);*/
/*
  if (!dyes || dyes.length === 0) {
    return (
      <Loader />
    );
  }
/*
  const fetchData = async (startDate: string, endDate: string, status: string) => {
    try {
        const url = `/api/list_of_dyes/?StartDate=${startDate}&EndDate=${endDate}&status=${status}`;
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


        let result = await response.json();
        console.log(result)
        console.log(user)
        console.log(localUser)
        let filteredResult = result
        /*if (localUser != '') {
            console.log('zxzzxxz')
            filteredResult = result?.filter((item: Dye) => item.User.includes(localUser)) || result
        }*/
        /*console.log(filteredResult)
        setDyes(filteredResult);
    } catch (error) {
        console.error('ошибка при выполнении запроса:', error);
    }
};

const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartDateFilter(e.target.value));
};

const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndDateFilter(e.target.value));
};

const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusFilter(e.target.value));
};

const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUser(e.target.value)
    dispatch(setUserFilter(e.target.value));
};





const handleChangeStatus = async (dyeId: number, Newstatus: string) => {
  try {
      await axios.put(
          `/api/dyeid/${dyeId}/status/${Newstatus}`,
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
          }
      );
      fetchData(startDate, endDate, status)
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

const handleResetFilter = () => {
  dispatch(setStartDateFilter(''));
  dispatch(setEndDateFilter(''));
  dispatch(setStatusFilter(''));
  dispatch(setUserFilter(''));
  setLocalUser('')
  fetchData(startDate, endDate, status)
}

const fetchDataWithPolling = async () => {
  try {
      fetchData(startDate, endDate, status);
  } catch (error) {
      console.error('Error fetching data with polling:', error);
  }
};



useEffect(() => {
  fetchData(startDate, endDate, status);
}, [startDate, endDate, status])

useEffect(() => {
  if (localUser != "") {
      const previos = dye
      setDyes(dye?.filter((item: Dye) => item.User.includes(localUser)) || previos);
  }
}, [localUser])

useEffect(() => {
  const pollingInterval = setInterval(() => {
      fetchDataWithPolling();
  }, 2000);
  return () => clearInterval(pollingInterval);

}, [startDate, endDate, status, localUser]);

if (!dye) {
  return <div> <Loader /></div>
}


*/
/*

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/dyes">Заявки</Link>
      </div>
      {/*<div style={{ margin: '3% 7% 0 7%' }}>
                {/*<div className='filter-container'>
                    <div className='filter'>
                        <label>Дата формирования (начало):</label>
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    <div className='filter'>
                        <label>Дата формирования (конец):</label>
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                    </div>
                    <div className='filter options'>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="">Статус (все)</option>
                            <option key={"formed"} value={"formed"}>
                                Сформирован
                            </option>
                            <option key={"ended"} value={"ended"}>
                                Завершён
                            </option>
                            <option key={"reject"} value={"reject"}>
                                удалено
                            </option>
                        </select>
                    </div>*/
                   // </div>
                    //</div>
                    /*<div><Button className='filter-button' variant="primary" onClick={() => { handleResetFilter() }}>
                        Сбросить фильтры
                    </Button></div>*/
      /*<div style={{ margin: '10% 10% 0 10%' }}>
      <div className='table-responsive'>
        <Table striped bordered hover>
          <thead>
            <tr>
            {localStorage.getItem("role") === "2" &&  (
          <>
            <th key={'name'}>Пользователь</th>
          </>
        )}
        {localStorage.getItem("role") === "2" &&  (
          <>
            <th key={'namemod'}>Модератор</th>
          </>
        )}
              <th key={'status'}>Статус</th>
              <th key={'formDate'}>Сформирована</th>
              <th key={'endDate'}>Закончена</th>
              <th key={'Price'}>Цена</th>
              <th key={'name'}>Название</th>
              <th key={'more'}>Подробнее</th>
              <th key={'end'}>Закончить</th>
              <th key={'decline'}>Отменить</th>
            </tr>
          </thead>
          <tbody>
            {dyes.map((dye, index) => (
              <tr key={index}>
                <td>
      {localStorage.getItem("role") === "2" &&  (
        <span>{dye.User.Name}</span>
      )}
    </td>
    <td>
      {localStorage.getItem("role") === "2" &&   (
        <span>{dye.ModeratorUser.Name}</span>
      )}
    </td>
                <td>{dye.Status}</td>
                <td>{formattedTime(dye.FormationDate)}</td>
                <td>{formattedTime(dye.CompletionDate)}</td>
                <td>{dye.Price}</td>
                <td>{dye.Name}</td>
                <td><Link to={`/RIP_frontend/BasketPage/${dye.ID_Dye}`}>Подробнее</Link></td>
               {/*<td>{localStorage.getItem("role") === "2" && (<Button variant="primary" onClick={() => { handleChangeStatus(dye.Id, 'ended') }}>
                                                    Закончить</Button>)}</td>
                <td>{localStorage.getItem("role") === "2" && (<Button variant="danger" onClick={() => { handleChangeStatus(dye.Id, 'reject') }}>
      Отменить</Button>)}</td>*/
             /* </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </div>
  );
}

export default AllDyesPage;
*/

import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDyes } from '../../redux/dyes/dyesActions';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const AllDyesPage = () => {
  const dispatch = useDispatch();
  const dyes = useSelector((state: RootState) => state.dye.data);
  const status = useSelector((state: RootState) => state.dye.status);
  const role = useSelector((state: RootState) => state.auth.role)
  const formattedTime = (timestamp: string) => {
    if (typeof timestamp !== 'string') {
      return "Не установлено";
    }

    if (timestamp.includes('0001-01-01')) {
      return "Не установлено";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Date(timestamp).toLocaleDateString('ru-RU', options);

    return formattedDate;
  };

 /* useEffect(() => {
    dispatch(getAllDyes());
  }, [dispatch]);*/
  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllDyes());
    };

    const pollingInterval = setInterval(fetchData, 2000); 

    fetchData(); // сделать первый запрос сразу

    return () => clearInterval(pollingInterval); // очистить интервал при размонтировании компонента
  }, [dispatch]);


  if (!dyes || dyes.length === 0) {
    return (
      <Loader />
    );
  }
console.log(localStorage.getItem("role"))
  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/dyes">Заявки</Link>
      </div>
      <div style={{ margin: '10% 10% 0 10%' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th key={'status'}>Статус</th>
              <th key={'formDate'}>Сформирована</th>
              <th key={'endDate'}>Закончена</th>
              <th key={'Price'}>Цена</th>
              <th key={'name'}>Название</th>
              <th key={'more'}>Подробнее</th>
            </tr>
          </thead>
          <tbody>
            {dyes.map((dye, index) => (
              <tr key={index}>
                <td>{dye.Status}</td>
                <td>{formattedTime(dye.FormationDate)}</td>
                <td>{formattedTime(dye.CompletionDate)}</td>
                <td>{dye.Price}</td>
                <td>{dye.Name}</td>
                <td><Link to={`/RIP_frontend/BasketPage/${dye.ID_Dye}`}>Подробнее</Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllDyesPage;