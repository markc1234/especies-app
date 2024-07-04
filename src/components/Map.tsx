import { ImageBackground } from "expo-image";
import { StyleSheet, Pressable, Alert, Linking } from "react-native";
import { themeColors } from "@/src/theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction } from "react";
import * as Location from "expo-location"

type MapProps = {
  setLatitud: Dispatch<SetStateAction<string>>;
  setLongitud: Dispatch<SetStateAction<string>>;
};
export const Map: FC<MapProps> = ({ setLatitud, setLongitud }) => {

  const handlePress = async () => {
    let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    // TODO: si el permiso fue rechazado, abrir configuracion
    if (status === 'denied' || !canAskAgain) {
      Alert.alert(
        "Permiso denegado",
        "Permisos de ubicación son necesarios para esta funcionalidad.",
        [
          { text: "Abrir configuración", onPress: () => Linking.openSettings() },
          { text: "Cancelar", style: "cancel" }
        ]
      );
      return;
    }

    // TODO: Si el permiso podemos pregunta, preguntamos
    if (status !== 'granted') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permiso denegado",
          "Permisos de ubicación son necesarios para esta funcionalidad.",
          [
            { text: "Abrir configuración", onPress: () => Linking.openSettings() },
            { text: "Cancelar", style: "cancel" }
          ]
        );
        return;
      }
    }

    // TODO: Si tenmos acceso, nos quedamos con la posicion y seteamos latitud y longitud
    let location = await Location.getCurrentPositionAsync({});
    setLatitud(location.coords.latitude.toString());
    setLongitud(location.coords.longitude.toString());
    }

  return (
    <ImageBackground
      source={require("@/assets/images/map.png")}
      style={styles.map}
    >
      <Pressable style={styles.locationBtn} onPress={handlePress}>
        <MaterialIcons name="my-location" size={24} color="black" />
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  locationBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});