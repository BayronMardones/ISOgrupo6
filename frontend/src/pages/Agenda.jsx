import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Agenda = () => {  
    const [agendaData, setAgendaData] = useState([]);
    const [userData, setUserData] = useState({});
    const [solicitudData, setSolicitudData] = useState({});
    const [newAgenda, setNewAgenda] = useState({ solicitud: '', encargadoVisita: '', fecha: '' });
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();
    
    const handleInputChange = (event) => {
        setNewAgenda({ ...newAgenda, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${apiUrl}/agenda/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(newAgenda),
        });

        if (response.ok) {
            const data = await response.json();
            setAgendaData([...agendaData, data]);
            setNewAgenda({ encargadoVisita: '', solicitud: '', fecha: '' });
            console.log(data);
            console.log(agendaData);
        }
        
               
    };

    const handleDelete = async (id) => {
        const response = await fetch(`${apiUrl}/agenda/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        if (response.ok) {
            setAgendaData(agendaData.filter(agenda => agenda._id !== id));
        }
    };

    useEffect(() => {
        const getAgenda = async () => {
            try {
                console.log(`El token es: ${token}`);

                const response = await fetch(`${apiUrl}/agenda/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token, 
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.token);
                    setAgendaData(data);
                    // Obtén los datos del usuario para cada ID de usuario único en los datos de la agenda
                    const userIds = [...new Set(data.map(agenda => agenda.encargadoVisita))];
                    console.log("userIds: ", userIds);
                    userIds.forEach(id => fetchUserData(id));
                    const solicitudIds = [...new Set(data.map(agenda => agenda.solicitud))];
                    solicitudIds.forEach(id => fetchSolicitudData(id));

                } else {
                    console.error("Error en el inicio de sesión");
                    // Aquí podrías mostrar un mensaje de error al usuario
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        const fetchUserData = async (id) => {
            const response = await fetch(`${apiUrl}/usuario/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // setUserData(data)
                setUserData(prevUserData => ({ ...prevUserData, [id]: data}));
                // console.log("nombre de usuario: ", data.nombre);
                console.log("id de usuario: ", data._id);
            }

            
        };

        const fetchSolicitudData = async (id) => {
            const response = await fetch(`${apiUrl}/solicitud/buscar/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSolicitudData(prevSolicitudData => ({ ...prevSolicitudData, [id]: data }));
            }
        };
    
        getAgenda();
    }, [token, apiUrl]);

    return (
        <div className="agenda-container">
            <div className="agenda">
                <h1>AGENDA</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="encargadoVisita" value={newAgenda.encargadoVisita} onChange={handleInputChange} placeholder="Encargado Visita" required />
                    <input type="text" name="solicitud" value={newAgenda.solicitud} onChange={handleInputChange} placeholder="Solicitud" required />
                    <input type="date" name="fecha" value={newAgenda.fecha} onChange={handleInputChange} required />
                    <button type="submit">Crear entrada de agenda</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Encargado Visita id</th>
                            <th>rut encargado</th>
                            <th>Solicitud</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendaData.map((agenda) => (
                            <tr key={agenda._id}>
                                <td>{agenda._id}</td>
                                <td>{userData[agenda.encargadoVisita]?._id}</td>
                                <td>{userData[agenda.encargadoVisita]?.rut}</td>
                                <td>{solicitudData[agenda.solicitud]?._id}</td>
                                <td>{agenda.fecha}</td>
                                <td>
                                    <button onClick={() => handleDelete(agenda._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>       
    );
};

export default Agenda;