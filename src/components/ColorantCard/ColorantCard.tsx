import { FC } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './ColorantCard.css'
interface Props {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
    onAdd: (ID_Colorant: number) => void
}



const MusicCard: React.FC<Props> = ({ Name, Image, ID_Colorant, onAdd }) => (
    <Card className="containernew">
      <div className='card'>
      <Link to={`/RIP_frontend/${ID_Colorant}`}>
  <img src={Image} alt={Name} />
  <h3>{Name}</h3>
</Link>
      </div>
      {window.localStorage.getItem("accessToken") ? (
              <Button variant="primary" style={{ color: '#28a745', backgroundColor: '#fff', borderColor: '#28a745'}} onClick={() => onAdd(ID_Colorant)}>Добавить</Button>
            ) : null}
    </Card>
  )
  
  export default MusicCard;