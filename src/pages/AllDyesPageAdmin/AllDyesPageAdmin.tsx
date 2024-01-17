
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStartDateFilter,
  setEndDateFilter,
  setStatusFilter,
  setUserFilter,
} from '../../redux/dyeFilters/actions';
import { RootState } from '../../redux/store';

import { Table, Button, Form } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import axios from 'axios';

interface Data {
  ID_Dye: number;
  User: {
    Name: string;
  };
  Name: string;
  Status: string;
  FormationDate: string;
  CompletionDate: string;
  ModeratorUser: {
    Name: string;
  };
  Price: number;
}

const AllRequestsAdminPage = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state: RootState) => state.dyeFilters.startDate);
  const endDate = useSelector((state: RootState) => state.dyeFilters.endDate);
  const status = useSelector((state: RootState) => state.dyeFilters.status);
  const user = useSelector((state: RootState) => state.dyeFilters.user);
  const [localUser, setLocalUser] = useState(user);
  const [requests, setRequests] = useState<Data[] | null>(null);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const formattedTime = (timestamp: string) => {
    if (typeof timestamp === 'string' && timestamp.includes('0001-01-01')) {
      return 'Не установлено';
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

  
  

const fetchData = async (
  startDate: string,
  endDate: string,
  status: string,
  user: string
) => {
  try {
    // Обработка параметров запроса в зависимости от фильтров
    let url = '/api/list_of_dyes?';
    const queryParams = [];
    if (startDate) queryParams.push(`StartDate=${startDate}`);
    if (endDate) queryParams.push(`EndDate=${endDate}`);
    if (status) queryParams.push(`status=${status}`);
    if (user) queryParams.push(`user=${user}`);
    
    if (queryParams.length > 0) {
      url += queryParams.join('&');
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    console.log(user);
    console.log(localUser);

    let filteredResult = result;
    if (localUser !== '') {
      console.log('zxzzxxz');
      filteredResult =
        result?.filter((item: Data) => item.User.Name.includes(localUser)) || result;
    }
    console.log(filteredResult);
    setRequests(filteredResult);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
};

const fetchDataWithPolling = async () => {
  try {
      fetchData(startDate, endDate, status,localUser);
  } catch (error) {
      console.error('Error fetching data with polling:', error);
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
    setLocalUser(e.target.value);
    dispatch(setUserFilter(e.target.value));
  };

  const handleChangeStatus = async (dyeId: number, newStatus: string) => {
    try {
      await axios.put(
        `http://127.0.0.1:8080/dyeid/${dyeId}/status/${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
          },
        }
      );
      //fetchData(startDate, endDate, status,);
      fetchData(startDate, endDate, status, localUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResetFilter = () => {
    dispatch(setStartDateFilter(''));
    dispatch(setEndDateFilter(''));
    dispatch(setStatusFilter(''));
    dispatch(setUserFilter(''));
    setLocalUser('');
    fetchData(startDate, endDate, status,localUser);
  };

  useEffect(() => {
    fetchData(startDate, endDate, status,localUser);
  }, [startDate, endDate, status]);

  useEffect(() => {
    if (localUser !== '') {
      const previos = requests;
      setRequests(
        requests?.filter((item: Data) => item.User.Name.includes(localUser)) || previos
      );
    }
  }, [localUser]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
        fetchDataWithPolling();
    }, 2000);
    return () => clearInterval(pollingInterval);

}, [startDate, endDate, status, localUser]);

  return (
    <div>
      <div style={{ marginLeft: '5%', marginTop: '1%' }}>
      <Link to="/RIP_frontend/AdminMainPage">Каталог</Link>
        <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
          / Заявки
        </Link>
      </div>
      <div style={{ margin: '3% 7% 0 7%' }}>
        <div className="filter-container">
          <div className="filter">
            <label>Дата формирования (начало):</label>
            <input type="date" value={startDate} onChange={handleStartDateChange} />
          </div>
          <div className="filter">
            <label>Дата формирования (конец):</label>
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </div>
          <div className="filter options">
            <select value={status} onChange={handleStatusChange}>
              <option value="">Статус (все)</option>
              <option key={'formed'} value={'Сформирован'}>
                Сформирован
              </option>
              <option key={'ended'} value={'Завершён'}>
                Завершён
              </option>
              <option key={'reject'} value={'Отклонено'}>
                Отклонено
              </option>
            </select>
  </div>
  <div className="filter">
            <Form
              className="d-flex"
              id="search"
              style={{ width: '20%', minWidth: '250px' }}
            >
              <Form.Control
                type="search"
                placeholder="Поиск по имени пользователя"
                className="me-2"
                aria-label="Search"
                value={localUser}
                onChange={handleUserChange}
              />
            </Form>
          </div>
          <Button
            className="filter-button"
            variant="primary"
            onClick={() => {
              handleResetFilter();
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
        {requests?.length === 0 ? (
          <h1 className="small-h1" style={{ marginTop: '5%' }}>
            Нет данных, которые соответствуют фильтрам
          </h1>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th key={'nameUser'}>Пользователь</th>
                  <th key={'namemod'}>Модератор</th>
                  <th key={'Status'}>Статус</th>
                  <th key={'formDate'}>Сформирована</th>
                  <th key={'endDate'}>Закончена</th>
                  <th key={'Price'}>Цена</th>
                  <th key={'name'}>Название</th>
                  <th key={'more'}>Закончить</th>
                  <th key={'end'}>Отменить</th>
                  <th key={'decline'}>Подробнее</th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((request, index) => (
                  <tr key={index}>
                    <td>
                  {request.User.Name}
                </td>
                <td>
                  {request.ModeratorUser.Name}
                </td>
                <td>{request.Status}</td>
                <td>{formattedTime(request.FormationDate)}</td>
                <td>{formattedTime(request.CompletionDate)}</td>
                <td>{request.Price}</td>
                <td>{request.Name}</td>
                
                    {request.Status === 'ended' || request.Status === 'reject' ? (
                      <>
                        <td>Заявка закончена</td>
                        <td>Заявка закончена</td>
                        <td>
                          <Link to={`/RIP_frontend/BasketPage/${request.ID_Dye}`}>
                            Подробнее
                          </Link>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleChangeStatus(request.ID_Dye, 'ended');
                            }}
                          >
                            Закончить
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleChangeStatus(request.ID_Dye, 'reject');
                            }}
                          >
                            Отменить
                          </Button>
                        </td>
                        <td>
                          <Link to={`/RIP_frontend/BasketPage/${request.ID_Dye}`}>
                            Подробнее
                          </Link>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequestsAdminPage;
