// EstadoSolicitudes.js
import React, { useState } from "react";
import axios from "axios";

const EstadoSolicitudes = ({ rut }) => {
  const [estadoSolicitudes, setEstadoSolicitudes] = useState([]);

  const obtenerEstado = async () => {
    try {
      // Realiza una solicitud GET para obtener las solicitudes del usuario por Rut
      const response = await axios.get(`/api/solicitud/listar?rut=${rut}`);
      
      setEstadoSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener el estado de las solicitudes:", error);
    }
  };

  return (
    <div>
      <button onClick={obtenerEstado}>Obtener Estado</button>

      <h2>Estado de las Solicitudes</h2>
      <ul>
        {estadoSolicitudes.map((solicitud) => (
          <li key={solicitud._id}>
            ID: {solicitud._id}, Estado: {solicitud.estado}, Fecha: {solicitud.fecha}
            {/* Agrega más campos según tus necesidades */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstadoSolicitudes;
