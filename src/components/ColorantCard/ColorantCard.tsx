import { FC } from 'react'
import { Link } from 'react-router-dom';
import {  Card } from 'react-bootstrap'
import './ColorantCard.css'
interface Props {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
}



const MusicCard: FC<Props> = ({ Name, Image, ID_Colorant}) => (
    <Card className="containernew">
        <div className='card'> 
      <Link to={`/RIP_frontend/${ID_Colorant}`}>
  <img src={Image} alt={Name} />
  <h3>{Name}</h3>
</Link>   
        </div>
    </Card>
)

export default MusicCard;
