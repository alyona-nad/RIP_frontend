import { FC } from 'react'
import { Card, Button } from 'react-bootstrap'
import './ColorantCard.css'
interface Props {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
    onAdd: (ID_Colorant: number) => void
}


/*
const MusicCard: React.FC<Props> = ({ Name, Image, ID_Colorant}) => (
    
    <Card className="containernew">
        <div className='card'> 
      <a href={`/RIP_frontend/${ID_Colorant}`}>
            <img src={Image}  alt="{Name}"/>
            <h3>{ Name}</h3>
            </a>    
        </div>
    </Card>
)

export default MusicCard;*/
const MusicCard: React.FC<Props> = ({ Name, Image, ID_Colorant, onAdd }) => (
    <Card className="containernew">
      <div className='card'>
        <a href={`/RIP_frontend/${ID_Colorant}`}>
          <img src={Image} alt={Name} />
          <h3>{Name}</h3>
        </a>
        {/* Кнопка "Добавить" под карточкой */}
      </div>
      {window.localStorage.getItem("accessToken") ? (
              <Button variant="primary" onClick={() => onAdd(ID_Colorant)}>Добавить</Button>
            ) : null}
    </Card>
  )
  
  export default MusicCard;