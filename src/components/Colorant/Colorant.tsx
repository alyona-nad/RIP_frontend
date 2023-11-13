import { FC, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import { colorants as defaultColorants } from "/src/model.tsx"
interface Props {
  Name: string;
  Image: string;
  ID_Colorant: number;
  Description: string;
  Properties: string;
  onSubmit: () => void;
}

const Colorants: FC<Props> = ({ ID_Colorant }) => {
  const [colorant, setColorant] = useState<Props | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchColorant = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/product/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const colorantData: Props = await response.json();
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

  if (!colorant) {
    return <div>Нет доступных данных.</div>;
  }

  return (
    
      <Card.Body>
        <div className="breadcrumbs">
        <Link to="/">Каталог</Link>/<Link to="/colorants:id'">{colorant.Name}</Link>
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
    
  );
};

export default Colorants;
