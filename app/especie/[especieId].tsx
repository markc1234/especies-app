import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function EspecieShowScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Especie Show</Text>
      <Link href="/(tabs)/home">Volver al home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
