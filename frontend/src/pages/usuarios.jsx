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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = React.useState(false);

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

  const recargarUsuarios = async () => {
    const response = await fetch(`${apiUrl}/usuario/`, {
      method: "GET",
      headers: {
        Authorization: token, 
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setUsuarios(data);
    }
  }

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
        recargarUsuarios();
        alert('Usuario eliminado exitosamente');
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

React.useEffect(() => {
  if (isUserUpdated) {
    if (selectedUser) {
      alert('Usuario modificado con éxito');
    } else {
      alert('Usuario creado con éxito');
    }
    setIsUserUpdated(false);
  }
}, [isUserUpdated]);

const handleSubmit = async (event) => {
  event.preventDefault();

  const url = selectedUser ? `${apiUrl}/usuario/${selectedUser._id}` : `${apiUrl}/usuario/`;
  const method = selectedUser ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // si la solicitud es exitosa, actualizar los usuarios en el estado local
    if (selectedUser) {
      setUsuarios(usuarios.map((usuario) => 
        usuario._id === selectedUser._id ? data : usuario
        
      ));
    } else {
      setUsuarios(prevUsuarios => [...prevUsuarios, data]);
      alert('Usuario creado con éxito');
    }
    await recargarUsuarios();
    setIsUserUpdated(true);
  } catch (error) {
    console.error('Error al actualizar usuario: ', error);
  } finally {
    // cerrar el diálogo
    handleDialog();
  }
};


      const [dialogTitle, setDialogTitle] = useState('');

        const handleEditClick = (user) => {
        setSelectedUser(user);
        setDialogTitle('Editar Usuario');
        setOpenDialog(true);
          };

       const handleCreateClick = () => {
        setSelectedUser(null);
        setDialogTitle('Crear Usuario');
        setOpenDialog(true);
          };
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
        {dialogTitle}
        </DialogTitle>
        <DialogContent onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
        
        <TextField
          name='nombre'
          defaultValue={selectedUser ? selectedUser.nombre : ''}
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
          defaultValue={selectedUser ? selectedUser.rol : ''}
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
          defaultValue={selectedUser ? selectedUser.email : ''}
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
            <Button onClick={handleCreateClick} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo Usuario</Button>
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
                  <IconButton onClick={() => handleEditClick(usuario)}>
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
