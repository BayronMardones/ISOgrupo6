import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import "../index.css";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'


const AgendaTabla = () => {
    const [agendas, setAgendas] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    useEffect(() => {
        const fetchAgendas = async () => {
            const response = await fetch(`${apiUrl}/agenda/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            const data = await response.json();
            setAgendas(data);
        };

        fetchAgendas();
    }, [token, apiUrl]);

    // ...

    return (
        <div>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>Agenda</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Encargado Visita</Th>
                            <Th>Solicitud</Th>
                            <Th>Fecha</Th>
                            <Th>Hora</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {agendas.map((agenda) => (
                            <Tr key={agenda._id}>
                                <Td>{agenda.encargadoVisita}</Td>
                                <Td>{agenda.solicitud}</Td>
                                <Td>{new Date(agenda.fecha).toLocaleDateString()}</Td>
                                <Td>{new Date(agenda.fecha).toLocaleTimeString()}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Encargado Visita</Th>
                            <Th>Solicitud</Th>
                            <Th>Fecha</Th>
                            <Th>Hora</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>

    );
}

export default AgendaTabla;

