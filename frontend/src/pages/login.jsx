import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EstadoSolicitudes from "./EstadoSolicitudes"; 
import "../index.css";

const Login = () => {
	const [rut, setRut] = useState("");
	const [contrasena, setContrasena] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	// Obtener la URL de la API desde las variables de entorno desde vite
	const apiUrl = import.meta.env.VITE_API_URL;

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${apiUrl}/login/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ rut, contrasena }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data.token);

				// Guarda el token en el contexto
				login(data.token);
				// Redirige a /home
				navigate("/home");
			} else {
				console.error("Error en el inicio de sesión");
				// Aquí podrías mostrar un mensaje de error al usuario
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	};

	return (
		<div>
			<h1>Edificación, Obras, Regularización</h1>
			<h3>Por favor, inicia sesión para continuar</h3>
			<br />
			<div className="login-container">
				<div className="login">
					<form onSubmit={handleLogin}>
						<div className="formulario">
						<h4>RUT</h4>
							<label>
								<input
									type="text"
									value={rut}
									onChange={(e) => setRut(e.target.value)}
								/>
							</label>
						</div>
						<div className="formulario">
							<h4> Contraseña</h4>
							<label>
								
								<input
								// texto dentro de la caja de texto del password
									type="password"
									value={contrasena}
									onChange={(e) => setContrasena(e.target.value)}
								/>
							</label>
						</div>
						<button className="login-button" type="submit">
							Iniciar sesión
						</button>
					</form>
				</div>
			</div>
			<div>
				<h3 className="register">Revisa el estado de tu solicitud aquí</h3>
			</div>
		</div>
	);
};

export default Login;
