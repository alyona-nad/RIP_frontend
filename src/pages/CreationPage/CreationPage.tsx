import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';



const CreateColorant = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [properties, setProperties] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleEdit = async (name: string, description: string, properties: string, status: string) => {
        if (status==="") {
            setError('Введите статус!')
            return
        }
        if (name==="") {
            setError('Введите название!')
            return
        }
        try {
            await axios.post(
                `/api//new_colorant`,
                {
                    "Name": name,
                    "Description": description,
                    "Status": status,
                    "Properties": properties,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            navigate('/RIP_frontend/AdminMainPage')
        } catch (error) {
            setError('Уже есть краситель с таким названием!')
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {

    }, [error])



    return (
        <div>
            <div style={{ marginLeft: "5%", marginTop: "1%" }}>
                <Link to="/RIP_frontend/AdminMainPage" style={{ textDecoration: 'none' }}>Главная </Link>
                <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
                    / Создание красителя
                </Link>
            </div>
            <div className='container create-page'>
                <h1 className='small-h1'>Создание красителя</h1>
                <Form>
                    {/* Добавьте дополнительные поля ввода здесь */}
                    <Form.Group className="mb-3 create-form" controlId="formAdditionalField1">
                        <Form.Label>Название краситель</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 create-form" controlId="formAdditionalField2">
                        <Form.Label>Описание красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Описание"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 create-form" controlId="formAdditionalField3">
                        <Form.Label>Свойства красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Свойства"
                            name="properties"
                            value={properties}
                            onChange={(e) => setProperties(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 create-form" controlId="formAdditionalField4">
                        <Form.Label>Статус красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Статус"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <div className="error-message">{error}</div>}
                <Button variant="primary" style={{ color: '#fff', backgroundColor: '#118bd4', borderRadius:'0'}}  onClick={() => handleEdit(name, description, properties,status)}>
                    Создать
                </Button>
            </div>
        </div>
    )
}

export default CreateColorant;