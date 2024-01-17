import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Data {
    Dyes: number;
    Colorants: {
        ID_Colorant: number;
        Name: string;
        Description: string;
        Image: string;
        Properties: string;
        Status: string;
    }[];

}

const EditPage = () => {
    const [data, setData] = useState<Data | null>({ Dyes: 0, Colorants: [] });
    /*const { colorantID } = useParams();
    const parsedId = colorantID ? parseInt(colorantID) : 0;*/
    const { colorantID } = useParams<{ colorantID?: string }>();
    const parsedId = colorantID ? parseInt(colorantID, 10) : 0;
    console.log("colorantID",colorantID)
    console.log("parse",parsedId)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [properties, setProperties] = useState("");
    const [image, setImg] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const url = '/api/list_of_colorants/';
            let response;
            if (!localStorage.getItem("accessToken")) {
                response = await axios.get(url);
            } else {
                response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
            }
            const result = response?.data;
            console.log(result);
            setData(result);
        } catch (error) {
            console.error('ошибка при выполнении запроса:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleEdit = async (name: string, description: string, properties: string, status:string, image: File | null) => {

        try {
            await axios.put(
                `/api/update_colorants/${colorantID}`,
                {
                    "Name": name,
                    "Description": description,
                    "Properties":properties,
                    "Status": status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            if (image) {
                let formData = new FormData();
                formData.append('image', image)
                try {
                    await axios.post(`/api/${colorantID}/addImage`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                        });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            navigate('/RIP_frontend/AdminMainPage')
        } catch (error) {
            setError('Ошибка в вводе данных')
            console.error('Error fetching data:', error);
        }
    }
    
    useEffect(() => {
        if (loading) {
            setName("");
            setDescription("");
            setStatus("");
            setProperties("")
            fetchData();
        } else {
            const colorant = data?.Colorants.find(item => item.ID_Colorant === parsedId);
            console.log(colorant)
            console.log(parsedId)
            if (colorant) {
                setName(colorant.Name || "");
                setDescription(colorant.Description || "");
                setStatus(colorant.Status || "");
                setProperties(colorant.Properties || "");
            }
        }
    }, [error, data ]);

console.log(name, description, status,properties)

    return (
        <div>
            <div style={{ marginLeft: "5%", marginTop: "1%" }}>
                <Link to="/RIP_frontend/AdminMainPage" style={{ textDecoration: 'none' }}>Главная </Link>
                <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
                    / Редактирование красителя
                </Link>
            </div>
            <div className='container create-page'>
                <h1 className='small-h1'>Редактирование красителя</h1>
                <Form>
                    
                    <Form.Group className="mb-3" controlId="formAdditionalField1">
                        <Form.Label>Название красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalField2">
                        <Form.Label>Описание красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Описание"
                            name="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalField3">
                        <Form.Label>Свойства красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Свойства"
                            name="properties"
                            value={properties}
                            onChange={(e) => setProperties(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalField4">
                        <Form.Label>Статус красителя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Статус"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalField3">
                        <Form.Label>Изображение красителя</Form.Label>
                        <Form.Control
                            type="file"
                            name="img"
                            onChange={(e) => setImg((e.target as HTMLInputElement).files?.[0] || null)}
                        />
                    </Form.Group>
                </Form>
                {error && <div className="error-message">{error}</div>}
                <Button variant="primary" onClick={() => handleEdit(name, description, properties, status, image)}>
                    Редактировать
                </Button>
            </div>
        </div>
    )
}

export default EditPage;