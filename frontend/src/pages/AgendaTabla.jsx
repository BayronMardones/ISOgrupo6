import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "./agenda.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SideBarContext";


const Agenda = () => {
    const { isSidebarOpen } = useSidebar();
    const [agendaData, setAgendaData] = useState([]);
    const [userData, setUserData] = useState({});
    const [solicitudData, setSolicitudData] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

 
    //OBTENER AGENDA
    useEffect(() => {
        const getAgenda = async () => {
            try {

                const response = await fetch(`${apiUrl}/agenda/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAgendaData(data);
                    // Obtén los datos del usuario para cada ID de usuario único en los datos de la agenda
                    const userIds = [...new Set(data.map(agenda => agenda.encargadoVisita))];
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

        getAgenda();
    }, [token, apiUrl]);

    return (
        <div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <Navbar />
            <Sidebar />

            <div className="agenda-container">
                <div className="agenda">
                    <h1>AGENDA</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID AGENDA</th>
                                <th>Encargado Visita</th>
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
                                    <td>{userData[agenda.encargadoVisita]?.nombre}</td>
                                    <td>{userData[agenda.encargadoVisita]?.rut}</td>
                                    <td>{solicitudData[agenda.solicitud]?.estado}</td>
                                    <td>{new Date(agenda.fecha).toLocaleDateString()}</td>
                                    <td>{new Date(agenda.fecha).toISOString().split('T')[1].substring(0, 8)}</td>
                                    <br />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Agenda;