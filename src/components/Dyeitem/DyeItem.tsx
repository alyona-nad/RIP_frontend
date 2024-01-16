/*import React from 'react';

interface Colorant {
    ID_Colorant: number;
    Name: string;
  }

interface Dye {
    Name: string;
    Status: string;
    CreationDate: string;
    Price: number;
    Colorants: Colorant[];
  }

  const DyeDetails: React.FC<{ dye: Dye }> = ({ dye }) => (
  <div>
    <h2>{dye.Name}</h2>
    <p>Status: {dye.Status}</p>
    <p>Price: {dye.Price}</p>
    <p>Creation Date: {dye.CreationDate}</p>

    <h3>Colorants:</h3>
    <ul>
    {dye.Colorants.map((colorant: Colorant) => (
        <li key={colorant.ID_Colorant}>
          <h4>{colorant.Name}</h4>
        </li>
      ))}
    </ul>
  </div>
);

export default DyeDetails;*/
import { FC } from 'react'
import { Card, Button } from 'react-bootstrap'
import '../ColorantCard/ColorantCard.css'
interface Props {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
    onRemove: (ID_Colorant: number) => void
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
const DyeCard: React.FC<Props> = ({ Name, Image, ID_Colorant, onRemove }) => (
    <Card className="containernew">
      <div className='card'>
        <a href={`/RIP_frontend/${ID_Colorant}`}>
          <img src={Image} alt={Name} />
          <h3>{Name}</h3>
        </a>
        {/* Кнопка "Добавить" под карточкой */}
      </div>
      {window.localStorage.getItem("accessToken") ? (
              <Button variant="primary" onClick={() => onRemove(ID_Colorant)}>Удалить</Button>
            ) : null}
    </Card>
  )
  
  export default DyeCard;
