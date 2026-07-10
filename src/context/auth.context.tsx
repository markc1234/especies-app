import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../services/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false); // deja de cargar cuando Firebase responde si hay sesion activa o no
    });

    // limpiamos la suscripcion cuando el componente se desmonta
    return () => unsubscribe();
    }, []);

    // funcion global para cerrar sesion
    const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error al cerrar sesion:", error);
    }
    };

    return (
    <AuthContext.Provider value={{ user, loading, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

// hook personalizado para poder usar la sesión en cualquier componente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};