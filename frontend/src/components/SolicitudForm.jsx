import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Style.css";

const SolicitudForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setArchivosSeleccionados(event.target.files);
  };

  const onSubmitSolicitud = async (data) => {
    const formData = new FormData();
    data.archivosAdjuntos = archivosSeleccionados;
    for (const archivo of data.archivosAdjuntos) {
      formData.append("archivos", archivo);
    }
    delete data.archivosAdjuntos; // No enviamos el array vacío

    try {
        await axios.post(`${apiUrl}/solicitud/crear ${solicitudId}`, data, {
        headers: {
          Authorization: token,
          "Content-Type": "apllication/json",
        },
      });
      onSubmit();
    } catch (error) {
      console.error("Error al crear la solicitud:", error);
    }
  };

  useEffect(() => {
    fileInputRef.current.value = "";
  }, [onSubmit]);

  return (
    <form className="solicitud-form" onSubmit={handleSubmit(onSubmitSolicitud)}>
      <h2>Nueva Solicitud</h2>
      <div className="field">
        <label htmlFor="solicitante">Solicitante:</label>
        <input
          type="text"
          {...register("solicitante", { required: true })}
          id="solicitante"
        />
        {errors.solicitante && (
          <span className="error">{errors.solicitante.message}</span>
        )}
      </div>
      <div className="field">
            <label htmlFor="detalles">Detalles:</label>
            <textarea
                {...register("detalles", { required: true })}
                id="detalles"
            />
            {errors.descripcion && (
                <span className="error">{errors.descripcion.message}</span>
            )}
        </div>
      <div className="field">
        <label htmlFor="estado">Estado:</label>
        <select
          {...register("estado", { required: true })}
          id="estado"
        >
          {/* Opciones de estado según tu modelo */}
        </select>
        {errors.estado && <span className="error">{errors.estado.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="direccion">Dirección:</label>
        <div className="direccion-subfields">
          <input
            type="text"
            {...register("direccion.zona", { required: true })}
            placeholder="Zona"
            id="direccion-zona"
          />
          <input
            type="text"
            {...register("direccion.calle", { required: true })}
            placeholder="Calle"
            id="direccion-calle"
          />
          <input
            type="text"
            {...register("direccion.numero", { required: true })}
            placeholder="Número"
            id="direccion-numero"
          />
        </div>
        {errors.direccion && (
          <span className="error">{errors.direccion.message}</span>
        )}
      </div>
      <div className="field">
        <label htmlFor="archivos">Archivos adjuntos:</label>
        <input
          type="file"
          multiple
          id="archivos"
          ref={ fileInputRef }
            onChange={ handleFileChange }
        />
        </div>
        <div className="field">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
                {...register("descripcion", { required: true })}
                id="descripcion"
            />
            {errors.descripcion && (
                <span className="error">{errors.descripcion.message}</span>
            )}
        </div>
        <input type="submit" value="Crear Solicitud" /> 
    </form>
    );
};
export default SolicitudForm;
