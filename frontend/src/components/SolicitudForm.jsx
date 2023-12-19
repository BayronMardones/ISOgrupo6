import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Style.css";

const SolicitudForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmitSolicitud = async (data) => {
    const files = data.currentTarget.files;
    console.log(files)
    try {
      const res = await axios.post(`${apiUrl}/solicitud/crearANoFile`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      // Subida de archivos

      let filesdata = {};
      Array.from(files).forEach(file  => {
        resfiles = axios.post(`${apiUrl}/file/${res.data._id}/${file.name}`, file, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        filesdata = {
          ...filesdata,
          resfiles
        }
      })

     // fetchSolicitudes();
      onSubmit();

      /*if(data.archivosAdjuntos) {
        await axios.post(`${apiUrl}/solicitud/crearA`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            
          },
        });
        fetchSolicitudes();
        onSubmit();
      } else {
        await axios.post(`${apiUrl}/solicitud/crearANoFile`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            
          },
        });
        fetchSolicitudes();
        onSubmit();
      }*/
      
    } catch (error) {
      console.error("Error al crear la solicitud:", error.response?.data);
    }
  };
  
  

  useEffect(() => {
    // Any cleanup or side effect you want to perform on submit
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
          <option value="">Selecciona un estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>
        {errors.estado && (
          <span className="error">{errors.estado.message}</span>
        )}
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
      {/* Removed the file input and related code */}
      <div className="field">
        <label htmlFor="archivosAdjuntos">Archivos Adjuntos:</label>
        <input
          type="file"
          {...register("archivosAdjuntos")}
          id="archivosAdjuntos"
          multiple // Permite seleccionar múltiples archivos
        />
      </div>

      <input type="submit" value="Crear Solicitud" />
    </form>
  );
};

export default SolicitudForm;
