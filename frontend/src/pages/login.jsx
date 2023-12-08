import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
		<div className="login-container">
			<div className="login">
				<h1>LOGIN</h1>
				<form onSubmit={handleLogin}>
					<div className="formulario">
						<label>
							RUT:
							<input
								type="text"
								value={rut}
								onChange={(e) => setRut(e.target.value)}
							/>
						</label>
					</div>
					<div className="formulario">
						<label>
							Contraseña:
							<input
								type="password"
								value={contrasena}
								onChange={(e) => setContrasena(e.target.value)}
							/>
						</label>
					</div>
					<button className="login-button" type="submit">Iniciar sesión</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
