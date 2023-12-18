import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(Cookies.get("token") || null);

	const login = (newToken) => {
		setToken(newToken);
		Cookies.set("token", newToken, { expires: 1 }); // Cookie expira en 7 días
	};

	const logout = () => {
		setToken(null);
		Cookies.remove("token");
	};

	const isAuthenticated = !!token;

	// Puedes agregar un efecto secundario para limpiar la cookie en caso de que el token cambie por alguna razón
	useEffect(() => {
		if (!token) {
			Cookies.remove("token");
		}
	}, [token]);

	return (
		<AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
