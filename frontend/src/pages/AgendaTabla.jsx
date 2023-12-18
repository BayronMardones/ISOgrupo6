import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import "./agenda.css";

const AgendaTabla = () => {
    const [agendas, setAgendas] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    useEffect(() => {
        const fetchAgendas = async () => {
            try {
                const response = await fetch(`${apiUrl}/agenda/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                setAgendas(data);

            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchAgendas();
    }, [token, apiUrl]);

    // ...

    return (
        <div className="miTabla">
            <h1>HOLA</h1>
            <table>
                <thead>
                    <tr>
                        <th>Encargado Visita</th>
                        <th>Solicitud</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {agendas.map((agenda) => (
                        <tr key={agenda._id}>
                            <td>{agenda.encargadoVisita}</td>
                            <td>{agenda.solicitud}</td>
                            <td>{new Date(agenda.fecha).toLocaleDateString()}</td>
                            <td>{new Date(agenda.fecha).toLocaleTimeString()}</td>
                            <br />
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    );
}

export default AgendaTabla;

