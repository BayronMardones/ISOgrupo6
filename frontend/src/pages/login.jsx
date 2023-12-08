import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const Login = () => {
	const [rut, setUsername] = useState("");
	const [contrasena, setPassword] = useState("");

	// Obtener la URL de la API desde las variables de entorno desde vite
	const apiUrl = import.meta.env.VITE_API_URL;

	const navigate = useNavigate();

	const {login} = useAuth();

	const handleLogin = async () => {
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
				
				// Redirige a /home
				login(data.token)
				
				navigate('/home');
			} else {
				console.error("Error en el inicio de sesión");
				// Aquí podrías mostrar un mensaje de error al usuario
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	};

	return (
		<div className="login-container">
			<div className="login">
				<h1>Login</h1>
				<div>
					<label>
						RUT:
						<input
							type="RUT"
							value={rut}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
				</div>
				<br />
				<div>
					<label>
						Contraseña:
						<input
							type="Contraseña"
							value={contrasena}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<br />
				<button onClick={handleLogin}>Iniciar sesión</button>
			</div>
		</div>
	);
};

export default Login;