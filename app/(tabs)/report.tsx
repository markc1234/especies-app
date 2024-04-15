import { StyleSheet, Text, View } from "react-native";

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
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
