import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  fetch("http://localhost:3000/especies");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Link href="/especie/1">To Especie show</Link>
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
