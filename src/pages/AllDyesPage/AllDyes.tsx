import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDyes } from '../../redux/dyes/dyesActions';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader';
import Table from 'react-bootstrap/Table';

const AllDyesPage = () => {
  const dispatch = useDispatch();
  const dyes = useSelector((state: RootState) => state.dye.data);
  const status = useSelector((state: RootState) => state.dye.status);

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

  useEffect(() => {
    dispatch(getAllDyes());
  }, [dispatch]);

  if (!dyes || dyes.length === 0) {
    return (
      <Loader />
    );
  }

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
