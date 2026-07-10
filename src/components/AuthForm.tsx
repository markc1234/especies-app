import React, { useState } from "react";
import { View, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { CustomTextInput } from "./CustomTextInput";
import { CustomButton } from "./CustomButton2";
import { TextNunitoSans } from "./TextNunitoSans";
import { themeColors, themeStyles } from "../theme/theme";

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // manejador del boton principal (email/contraseña)
    const handleSubmit = async () => {
    if (!email || !password) {
        Alert.alert("Error", "Por favor completa todos los campos.");
        return;
    }

    if (!isLogin && password !== confirmPassword) {
        Alert.alert("Error", "Las contraseñas no coinciden.");
        return;
    }

    setLoading(false);
    setLoading(true);

    try {
        if (isLogin) {
        // iniciar Sesión
        await signInWithEmailAndPassword(auth, email, password);
        } else {
        // registrar Usuario
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Éxito", "Usuario registrado correctamente.");
        }
    } catch (error: any) {
        console.error(error);
        let errorMessage = "Ocurrio un error inesperado.";
        if (error.code === "auth/invalid-credential") {
        errorMessage = "Correo o contraseña incorrectos.";
        } else if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este correo ya esta registrado.";
        } else if (error.code === "auth/weak-password") {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        } else if (error.code === "auth/invalid-email") {
        errorMessage = "El formato del correo es invalido.";
        }
        Alert.alert("Error de autenticacion", errorMessage);
    } finally {
        setLoading(false);
    }
    };

    return (
    <View style={[themeStyles.screen ,styles.formContainer]}>
        <TextNunitoSans style={styles.formTitle}>
        {isLogin ? "Iniciar Sesion" : "Crear Cuenta"}
        </TextNunitoSans>

        {/* Input de Email */}
        <CustomTextInput
        placeholder="Correo electronico"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        />

        {/* input de Contraseña */}
        <CustomTextInput
        placeholder="Contraseña"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
        />

        {/* confirmar contraseña (solo si es registro) */}
        {!isLogin && (
        <CustomTextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor="gray"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
        />
        )}

        {/* botón de envio o spinner de carga */}
        {loading ? (
        <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />
        ) : (
        <Pressable onPress={handleSubmit} style={styles.buttonWrapper}>
            <CustomButton label={isLogin ? "Ingresar" : "Registrarse"} />
        </Pressable>
        )}

        {/* enlace para alternar entre iniciar sesion / registro */}
        <Pressable onPress={() => setIsLogin(!isLogin)} style={styles.toggleContainer}>
        <TextNunitoSans style={styles.toggleText}>
            {isLogin ? "¿No tenes cuenta? " : "¿Ya tenes cuenta? "}
            <TextNunitoSans style={styles.toggleHighlight}>
            {isLogin ? "Registrate" : "Inicia Sesion"}
            </TextNunitoSans>
        </TextNunitoSans>
        </Pressable>
    </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
        gap: 16,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: themeColors.textBase,
        textAlign: "center",
        marginBottom: 10,
    },
    input: {
        width: "100%",
    },
    buttonWrapper: {
        width: "100%",
        marginTop: 10,
    },
    loader: {
        marginTop: 10,
    },
    toggleContainer: {
        marginTop: 15,
        alignItems: "center",
    },
    toggleText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 14,
    },
    toggleHighlight: {
        color: themeColors.primary, 
        fontWeight: "bold",
    },
});