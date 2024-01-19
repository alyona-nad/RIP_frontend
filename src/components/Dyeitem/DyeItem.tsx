
import { FC } from 'react'
import { Card, Button } from 'react-bootstrap'
import '../ColorantCard/ColorantCard.css'

interface Props {
  Name: string
  Image: string
  ID_Colorant: number
  onRemove: (ID_Colorant: number) => void
  isMatchingId: boolean
}

const DyeCard: FC<Props> = ({ Name, Image, ID_Colorant, onRemove, isMatchingId }) => (
  <Card className="containernew">
      <div className='card'>
        <a href={`/RIP_frontend/${ID_Colorant}`}>
          <img src={Image} alt={Name} />
          <h3>{Name}</h3>
        </a>
        
      </div>
      {isMatchingId && window.localStorage.getItem("accessToken") ? (
        <Button variant="primary"  style={{ color: '#dc3545', backgroundColor: '#fff', borderColor: '#dc3545'}} onClick={() => onRemove(ID_Colorant)}>Удалить</Button>
      ) : null}
  </Card>
)

export default DyeCard;
