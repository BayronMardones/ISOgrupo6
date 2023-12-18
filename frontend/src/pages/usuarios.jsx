import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../index.css";
import {Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Grid, Box, Button, Stack, Divider, Table, TableContainer, TableHead, TableRow, TableCell, IconButton, TableBody} from "@mui/material";
import {AddOutlined, EditOutlined, DeleteForeverOutlined} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SideBarContext";
import "./home.css"


const Usuarios = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [usuarios, setUsuarios] = useState([]);
  const { token } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [UsuariosData, setUsariosData] = useState([]);
  const [newUser, setNewUser] = useState({ Nombre: '', Rut: '', Rol: '', Correo: '' });
  const { isSidebarOpen } = useSidebar();


  const init = async () => {
		const { data } = await ApiRequest().get('/usuarios')
		setUsuariosList(data)
	}


  useEffect(async () => {
    // Realiza la solicitud GET a la API
    const response = await fetch(`${apiUrl}/usuario/ `, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  
    // Si la solicitud es exitosa, procesa la respuesta
    if (response.status === 200) {
      const data = await response.json();
      setUsuarios(data);
    }
  }, []);


  const onDelete = async (_id) => {
    try {
      const response = await fetch(`${apiUrl}/usuario/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: token, 
        },
        
      });
      
      if (response.ok) {
        console.log("Usuario eliminado exitosamente");
        

      } else {      
        console.error("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    } 
  };

  
  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${apiUrl}/usuario/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        
        body: JSON.stringify(newUser),
        
    });
    handleDialog()

    if (response.ok) {
        const data = await response.json();
        setUsuariosData([...UsuarioData, data]);
        setNewUser({ Nombre: '', Rut: '', Rol: '', Correo: '' });
        console.log(data);
        console.log(UsuarioData);
      }}


  const handleDialog= () => {
    setOpenDialog(prev => !prev)
  }

  return (
      <><>
<div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
			<Navbar />
			<Sidebar />
      </div>
<Dialog fullWidth open={openDialog} onClose={handleDialog}>
        <DialogTitle>
          Crear Usuario
        </DialogTitle>
        <DialogContent onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
        
        <TextField
          name='nombre'
          value={newUser.nombre}
          variant='outlined'
          size='small'
          color='primary'
          label='Nombre'
          onChange={handleInputChange}
          /> 

        <Grid item xs={12} sm={12}>
        <TextField
          name='rut'
          value={newUser.rut}
          variant='outlined'
          size='small'
          color='primary'
          label='Rut'
          onChange={handleInputChange}
        />  
        </Grid>
        <Grid item xs={12} sm={12}>
        <TextField
          name='rol'
          value={newUser.rol}
          variant='outlined'
          size='small'
          color='primary'
          label='Rol'
          onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <TextField
          name='email'
          value={newUser.email}
          variant='outlined'
          size='small'
          color='primary'
          label='Correo'
          onChange={handleInputChange}
          />  
        </Grid>
        
        </Grid>
        </Grid>
        </DialogContent>
        
        {<DialogActions>
          <Button variant='text' color='primary' onClick={handleDialog}> Cancelar </Button>
          <Button variant='Contained' color='primary' onClick={handleSubmit}> Guardar </Button>
        </DialogActions>}

      </Dialog>
    
      
      <Container maxWidth='lg'>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5">Lista de usuarios</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo Usuario</Button>
          </Grid>
          <Grid item xs={12} sm={8} />
          <Grid item xs={12} sm={12}>

          </Grid>
        </Grid>
      </Container>

    </><TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Nombre </TableCell>
              <TableCell> Rol </TableCell>
              <TableCell> Rut </TableCell>
              <TableCell> Correo </TableCell>
              <TableCell> Acciones </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>{usuario.rut} </TableCell>
                <TableCell>{usuario.email} </TableCell>
                <TableCell>
                  <IconButton onclick ={() => onEdit ()}size='small' color='primary'>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => onDelete(usuario._id)}>
                    <DeleteForeverOutlined />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></>
  
  );
  };
  export default Usuarios;
