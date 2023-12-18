import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "./agenda.css";

const Agenda = () => {
    const [agendaData, setAgendaData] = useState([]);
    const [userData, setUserData] = useState({});
    const [solicitudData, setSolicitudData] = useState({});
    const [newAgenda, setNewAgenda] = useState({ solicitud: '', encargadoVisita: '', fecha: '' });
    const [usuarios, setUsuarios] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    //MODIFICAR AGENDA

    //CREAR AGENDA NUEVA
    const handleInputChange = (event) => {
        setNewAgenda({ ...newAgenda, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Concatena la fecha y la hora en una sola cadena
        const fechaYHora = `${newAgenda.fecha}T${newAgenda.hora}:00`;
        // Crea una copia de newAgenda y reemplaza el campo de fecha con fechaYHora
        const newAgendaConFechaYHora = { ...newAgenda, fecha: fechaYHora };
        // console.log("fechaYHora: ", fechaYHora);
        // console.log("fecha: ", newAgenda.fecha);
        // console.log("Hora: ", newAgenda.hora);

        const response = await fetch(`${apiUrl}/agenda/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(newAgendaConFechaYHora),
            // body: JSON.stringify({
            //     ...newAgenda,
            //     fecha: new Date(fechaYHora).toISOString(), // Convierte la fecha y la hora en un objeto Date
            // }),
        });

        if (response.ok) {
            const data = await response.json();
            setAgendaData([...agendaData, data]);
            setNewAgenda({ encargadoVisita: '', solicitud: '', fecha: '' });
            console.log(data);
            console.log(agendaData);
        }
    };
    //ELIMINAR AGENDA
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

    //OBTENER AGENDA
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

        //OBTENER DATOS DEL USUARIO A MOSTRAR EN LA AGENDA
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
                setUserData(prevUserData => ({ ...prevUserData, [id]: data }));
                // console.log("nombre de usuario: ", data.nombre);
                console.log("id de usuario: ", data._id);
            }


        };

        //OBTENER DATOS DE LA SOLICITUD A MOSTRAR EN LA AGENDA
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

        const fetchUsuarios = async () => {
            const response = await fetch(`${apiUrl}/usuario/rol/encargado`, {
                headers: {
                    'Authorization': token,
                },
            });
            const data = await response.json();
            setUsuarios(data);
        };

        fetchUsuarios();
        getAgenda();
    }, [token, apiUrl]);

    return (
        <div className="agenda-container">
            <div className="agenda">
                <h1>AGENDA</h1>
                <form onSubmit={handleSubmit}>
                    <select name="encargadoVisita" value={newAgenda.encargadoVisita} onChange={handleInputChange} required>
                        {usuarios.map((usuario) => (
                            <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                        ))}
                    </select>
                    {/* <input type="text" name="encargadoVisita" value={newAgenda.encargadoVisita} onChange={handleInputChange} placeholder="Encargado Visita" required /> */}
                    <input type="text" name="solicitud" value={newAgenda.solicitud} onChange={handleInputChange} placeholder="Solicitud" required />
                    <input type="date" name="fecha" value={newAgenda.fecha} onChange={handleInputChange} required />
                    {/* <input type="time" name="hora" value={newAgenda.hora} onChange={handleInputChange} required /> */}
                    <select name="hora" value={newAgenda.hora} onChange={handleInputChange} required>
                        <option value="">--Seleccione la hora--</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                    </select>
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
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendaData.map((agenda) => (
                            <tr key={agenda._id}>
                                <td>{agenda._id}</td>
                                <td>{userData[agenda.encargadoVisita]?._id}</td>
                                <td>{userData[agenda.encargadoVisita]?.rut}</td>
                                <td>{solicitudData[agenda.solicitud]?.estado}</td>
                                <td>{new Date(agenda.fecha).toLocaleDateString()}</td>
                                <td>{new Date(agenda.fecha).toISOString().split('T')[1].substring(0, 8)}</td>
                                <td>
                                    <button onClick={() => handleDelete(agenda._id)}>Eliminar Agenda</button>
                                </td>
                                <td>
                                    <Link to={`/agenda/actualizar/${agenda._id}`}>
                                        <button>Actualizar Agenda</button>
                                    </Link>
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