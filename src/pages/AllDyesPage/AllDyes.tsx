/*import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDyes } from '../../redux/dyes/dyesActions';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader';
import Table from 'react-bootstrap/Table';
/*interface Props {
  Name: string
  Image: string
  ID_Colorant: number
  Link:string
  Description:string
}*/


/*const AllDyesPage = () => {
  const dispatch = useDispatch();
  const dyes = useSelector((state: RootState) => state.dye.data);
  const status = useSelector((state: RootState) => state.dye.status);

  const formattedTime = (timestamp: string) => {
    if (typeof timestamp !== 'string') {
      return "Не установлено";
    }
  
    // Проверка, что timestamp содержит '0001-01-01'
    if (timestamp.includes('0001-01-01')) {
      return "Не установлено";
    }
  
    // Форматирование timestamp
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

  /*if (!dyes || dyes.length === 0) {
    return (
      /*<>
      <Loader />
      </>*/
   /* );
  }
  */
  /*return (
    <div>
      
      <div style={{ margin: '10% 10% 0 10%' }}>
        <Table striped bordered hover>
          <thead>
            {/* <tr>
              {Object.keys(requests[0]).map((key) => (
                <th key={key}>{key}</th>
              ))} */
           /* <tr>
              <th key={'status'}>Статус</th>
              <th key={'formDate'}>Сформирована</th>
              <th key={'endDate'}>Закончена</th>
              <th key={'Price'}>Цена</th>
              <th key={'name'}>Название</th>
              {/* 1 3 4 7 8 9  0 2 5 6 */
           /* </tr>
          </thead>
          <tbody>
          
         { /*  {dyes.map((dye, index) => (
              <tr key={index}>
                {Object.values(dye).map((value, index) => {
                  const excludedIndices = [0, 2, 5, 6];
                  const timeRows = [3, 4, 8]
                  return excludedIndices.includes(index) ? null :
                    timeRows.includes(index) ? <td key={index}>{formattedTime(value as string) as React.ReactNode}</td> :
                      <td key={index}>{value as React.ReactNode}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllDyesPage;*/
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
      <div style={{ margin: '10% 10% 0 10%' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th key={'status'}>Статус</th>
              <th key={'formDate'}>Сформирована</th>
              <th key={'endDate'}>Закончена</th>
              <th key={'Price'}>Цена</th>
              <th key={'name'}>Название</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllDyesPage;
