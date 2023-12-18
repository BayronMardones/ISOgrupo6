import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './agenda.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SideBarContext";

const ActualizaAgenda = () => {
    const { isSidebarOpen } = useSidebar();
    const { id } = useParams();
    const [agenda, setAgenda] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [encargadoVisita, setEncargadoVisita] = useState('');

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const response = await fetch(`${apiUrl}/agenda/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                setAgenda(data);
                console.log(data._id);

            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchAgenda();
    }, [id, token, apiUrl]);

    console.log("esta es la agenda:", agenda);
    console.log("este es el id:", id);

    const updateAgenda = async (updatedAgenda) => {
        try {
            const response = await fetch(`${apiUrl}/agenda/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(updatedAgenda),
            });
            const data = await response.json();
            setAgenda(data);
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    useEffect(() => {
        if (agenda) {
            setFecha(agenda.fecha);
            setHora(agenda.hora);
            setEncargadoVisita(agenda.encargadoVisita);
        }
    }, [agenda]);

    const handleUpdate = () => {
        const updatedAgenda = {
            fecha: `${fecha}T${hora}:00`,
            encargadoVisita,
        };
        updateAgenda(updatedAgenda);
    };

    if (!agenda) {
        return <div>Cargando...</div>;
    }

    // Resto del componente...
    return (
        <div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <Navbar />
            <Sidebar />

            <div className='ActualizaAgenda'>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Encargado de Visita</th>
                            {/* Agrega aquí los demás campos que quieras mostrar */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{agenda.fecha}</td>
                            <td>{agenda.encargadoVisita}</td>
                            <td>
                                <button>.</button>
                            </td>
                            {/* Agrega aquí los demás campos que quieras mostrar */}
                        </tr>
                    </tbody>
                </table>

                {/* ...resto del código... */}
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <select name="hora" value={hora} onChange={(e) => setHora(e.target.value)} required>
                    <option value="">--Seleccione la hora--</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                </select>
                <input type="text" value={encargadoVisita} onChange={(e) => setEncargadoVisita(e.target.value)} />
                <button onClick={handleUpdate}>Actualizar</button>
            </div>
        </div>
    );
};

export default ActualizaAgenda;