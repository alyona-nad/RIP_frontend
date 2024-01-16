import { FC, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import { IColorant, colorants as defaultColorants } from "../../model.tsx"
import MoreAboutColorant from '../MoreAboutColorant/MoreAboutColorant.tsx'
/*interface Props {
  Name: string;
  Image: string;
  ID_Colorant: number;
  Description: string;
  Properties: string;
  onSubmit: () => void;
}
*/
const Colorants: FC<IColorant> = () => {
  const [colorant, setColorant] = useState<IColorant | null>(null);
  const { id } = useParams<{ id: string }>();
 
  //const [colorant, setColorant] = useState<IColorant[]>([])
 /* useEffect(() => {
    const fetchColorant = async () => {
      try {
        const response = await fetch(`api/${id}`);
        console.log(response.status) 
        if (!response.ok) {
          console.log('Ошибка2')
          throw new Error('Ошибка при получении данных');
        }
        const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    console.log('Ошибка: Неверный тип содержимого', contentType);
    throw new Error('Неверный тип содержимого');
  }

  //const data = await response.json();
  const data = JSON.parse(await response.text());
  console.log('Данные:', data);
  setColorant(data);
  console.log(data)
        //const colorantData: IColorant = await response.json();
        
        //setColorant(colorantData);
      } catch (error) {
        console.error('Ошибка:', error);
        const defaultColorant = defaultColorants.find((item) => item.ID_Colorant === Number(id));
        if (defaultColorant) {
          setColorant(defaultColorant);
        } else {
          console.error('Цвет не найден в models.tsx');
        }
      }
    };*/
/*
    useEffect(() => {
      const fetchColorant = async () => {
        try {
          const response = await fetch(`api/${id}`);
          console.log(response.status);
  
          if (!response.ok) {
            console.log('Ошибка2');
            throw new Error('Ошибка при получении данных');
          }
  
          const contentType = response.headers.get("content-type");
  
          if (!contentType || !contentType.includes("application/json")) {
            console.log('Ошибка: Неверный тип содержимого', contentType);
            throw new Error('Неверный тип содержимого');
          }
  
          const data = JSON.parse(await response.text());
          console.log('Данные:', data);
          setColorant(data);
  
        } catch (error) {
          console.error('Ошибка:', error);
          const defaultColorant = defaultColorants.find((item) => item.ID_Colorant === Number(id));
          if (defaultColorant) {
            setColorant(defaultColorant);
          } else {
            console.error('Цвет не найден в models.tsx');
          }
        }
      };

    if (id) {
      fetchColorant();
    }
  }, [id]);
*/
useEffect(() => {
  const fetchColorant = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/${id}`);
      console.log(response.status);
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const colorantData: IColorant = await response.json();
      console.log(colorantData);
      setColorant(colorantData);
    } catch (error) {
      console.error('Ошибка:', error);
      const defaultColorant = defaultColorants.find((item) => item.ID_Colorant === Number(id));
      if (defaultColorant) {
        setColorant(defaultColorant);
      } else {
        console.error('Цвет не найден в models.tsx');
      }
    }
  };

  if (id) {
    fetchColorant();
  }
}, [id]);
  if (colorant!=null) {
  return (
    
      <Card.Body>
        <div className="breadcrumbs">
        <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/:id'">{colorant.Name}</Link>
      </div>
        <div className="container">
        <h2>{colorant.Name}</h2>
          <div className="image">
            <img src={colorant.Image} alt={colorant.Name} width="400"/>
            <h2>Описание</h2>
            <p>{colorant.Description}</p>
          </div>
          <div className="text">
            <h2>Свойства</h2>
            {colorant.Properties}
          </div>
        </div>
      </Card.Body>
      //MoreAboutColorant(colorant)
    
  );}
};

export default Colorants;
