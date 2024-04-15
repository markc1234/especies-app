import { Especie, getEspecies } from "@/src/services/especies.service";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [especies, setEspecies] = useState<Especie[]>([]);

  const fetchEspecies = async () => {
    setIsFetching(true);
    setIsError(false);
    try {
      const especies = await getEspecies();
      setEspecies(especies);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEspecies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      {isFetching && <Text>Cargando...</Text>}
      {isError && (
        <Text style={{ color: "red" }}>Error al cargar las especies</Text>
      )}
      <View style={{ height: 150, overflow: "hidden" }}>
        {especies.map((especie) => (
          <Text key={especie.sp_id}>{especie.nombre_cientifico}</Text>
        ))}
      </View>

      <Pressable onPress={fetchEspecies}>
        <Text>Recargar</Text>
      </Pressable>
      <Link href="/especie/1">To Especie show</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
