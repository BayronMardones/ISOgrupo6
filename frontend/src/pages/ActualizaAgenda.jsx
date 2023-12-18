import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ActualizaAgenda = () => {
    const { id } = useParams();
    const [agenda, setAgenda] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    

    useEffect(() => {
        // Aquí debes reemplazar 'urlDeTuAPI' con la URL de tu API
        fetch(`${apiUrl}/agenda/${id}`)
            .then((res) => res.json())
            .then((data) => setAgenda(data));
    }, [id, apiUrl]);

    if (!agenda) {
        return (
            <div>Cargando...</div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí debes reemplazar 'urlDeTuAPI' con la URL de tu API
        fetch(`${apiUrl}/agenda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(agenda),
        }).then(() => {
            // Redirigir al usuario a la página de la agenda después de la actualización
            console.log("id de usuario: ");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Actualizar Agenda</h1>
            <h2>{agenda._id}</h2>
            <label>
                Encargado de la visita:
                <input
                    type="text"
                    value={agenda.encargadoVisita}
                    onChange={(e) => setAgenda({ ...agenda, encargadoVisita: e.target.value })}
                />
            </label>
            <label>
                Fecha:
                <input
                    type="date"
                    value={agenda.fecha}
                    onChange={(e) => setAgenda({ ...agenda, fecha: e.target.value })}
                />
            </label>
            <button type="submit">Actualizar Agenda</button>
        </form>
    );

};

export default ActualizaAgenda;