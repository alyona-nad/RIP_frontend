import { FC, useState, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import MusicCard from '../components/MusicCard/MusicCard'
import  InputField from '../components/InputField/InputField'
import { Link } from 'react-router-dom';
import {colorants as Colorants} from "../model.tsx"

const ITunesPage: FC = () => {
    const [loading, setLoading] = useState(true)
    const [music, setMusic] = useState([])
    const [currentFilter, setCurrentFilter] = useState('') // Добавляем состояние для значения поиска

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFilter(e.target.value)
        };
        
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()}

    useEffect(() => {
const fetchData = async () => {
    try {
      const url = currentFilter
        ? `http://127.0.0.1:8080/list_of_colorants?filterValue=${currentFilter}`
        : 'http://127.0.0.1:8080/list_of_colorants';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      setMusic(data.Colorants);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
      // Используем данные из models.tsx в случае ошибки
      setMusic(Colorants);
      setLoading(false);
    }
  };

  fetchData();
}, [currentFilter]);
    return (
        <div className="" style={{  width: '1220px'}}>
            <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/">Каталог</Link>
      </div>
       {/*<div className="containernew">*/}
            
            <div className="filter" >
                <form action="/home" method="get" onSubmit={handleSubmit}>
                <InputField
                value={currentFilter}
                setValue={(value) => setCurrentFilter(value)}
                loading={loading}
            />
         
                    {/*<input type="submit" value="Применить" />*/}
                </form>
            </div>
            <div className="card" style={{  width: '1220px', boxSizing: 'border-box',marginTop: '10px',marginLeft: 0,marginRight: 0  }}>
            <Row xs={4} md={4} className="g-4">
                {music.map((item, index) => (
                    <Col key={index}>
                        <MusicCard {...item} />
                    </Col>
                ))}
            </Row>
        </div> </div>/*</div>*/
    )
}


export default ITunesPage

