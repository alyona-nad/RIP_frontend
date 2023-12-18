import { FC, useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import MusicCard from '../components/ColorantCard/ColorantCard.tsx'
import  InputField from '../components/InputField/InputField.tsx'
import { Link } from 'react-router-dom';
import {IColorant,colorants as Colorants} from "../model.tsx"


const MainPage: FC = () => {
    const [loading, setLoading] = useState(true)
    const [music, setMusic] = useState<IColorant[]>([])
    const [currentFilter, setCurrentFilter] = useState('') // Добавляем состояние для значения поиска

        
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()}
       
    useEffect(() => {
const fetchData = async () => {
    try {
      const url = currentFilter
        ? `api/list_of_colorants?filterValue=${currentFilter}`
        : 'api/list_of_colorants';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      setMusic(data.Colorants);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
      if (currentFilter!="")
      {
        const filteredMusic = Colorants.filter((item) =>
                    item.Name.toLowerCase().includes(currentFilter.toLowerCase())
                );
                setMusic(filteredMusic);
      setLoading(false);
      } else {
      setMusic(Colorants);
      setLoading(false);}
    }
  };

  fetchData();
}, [currentFilter]);

    return (
        <div className="" style={{  width: '1220px'}}>
            <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/RIP_frontend/">Каталог</Link>
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


export default MainPage

