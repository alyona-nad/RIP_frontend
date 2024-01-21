import React from 'react';
import { Button } from 'react-bootstrap';

interface CartItemProps {
  item: {
    Name: string;
    Price: number;
  };
  onRemove: (removedItem: { Name: string; Price: number }) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
    console.log('CartItem data:', item);
    
    const handleRemove = () => {
      onRemove(item);
    };
  
    return (
      <tr>
        <td>{item.Name}</td>
        <td>{item.Price}</td>
        <td>
          <Button variant="danger" style={{ color: '#fff', backgroundColor: '#118bd4', borderRadius:'0'}} onClick={handleRemove}>
            Удалить
          </Button>
        </td>
      </tr>
    );
  };
  

export default CartItem;