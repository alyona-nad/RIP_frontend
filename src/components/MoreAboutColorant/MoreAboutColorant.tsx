import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../ColorantCard/ColorantCard.css'
interface Props {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
    Properties:string
}

const MoreAboutColorant: React.FC<Props> = ({ Name, Image, Description, Properties }) => (
    <Card.Body>
    <div className="breadcrumbs">
    <Link to="/RIP_frontend/">Каталог</Link>/<Link to="/RIP_frontend/:id'">{Name}</Link>
  </div>
    <div className="container">
    <h2>{Name}</h2>
      <div className="image">
        <img src={Image} alt={Name} width="400"/>
        <h2>Описание</h2>
        <p>{Description}</p>
      </div>
      <div className="text">
        <h2>Свойства</h2>
        {Properties}
      </div>
    </div>
  </Card.Body>
  )
  
  export default MoreAboutColorant;