import { FC } from 'react'
import {  Card } from 'react-bootstrap'
import './MusicCard.css'
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
      <a href={`/colorants/${ID_Colorant}`}>
            <img src={Image}  alt="{Name}"/>
            <h3>{ Name}</h3>
            </a>    
        </div>
    </Card>
)

export default MusicCard;