import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import "./agenda.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SideBarContext";
import { useParams } from "react-router-dom";

const Agenda = () => {
    const { isSidebarOpen } = useSidebar();
    const [agendaData, setAgendaData] = useState([]);
    const [newAgenda, setNewAgenda] = useState({ solicitud: '', encargadoVisita: '', fecha: '' });
    const [usuarios, setUsuarios] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(id);

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
        const data = { ...newAgendaConFechaYHora, solicitud: id };
        try {
            const response = await fetch(`${apiUrl}/agenda/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                // body: JSON.stringify(newAgendaConFechaYHora),
                body: JSON.stringify(data),

            });

            const result = await response.json();
        } catch (error) {
            console.error("Error de red:", error);
        }

    };

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
                } else {
                    console.error("Error en el inicio de sesión");
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
                // console.log("nombre de usuario: ", data.nombre);
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
        <div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <Navbar />
            <Sidebar />

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
                        <input type="text" name="solicitud" value={id} readOnly />
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
                </div>
            </div>
        </div>
    );
};

export default Agenda;