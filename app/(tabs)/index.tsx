import { EspecieList } from "@/src/components/EspecieList";
import { HomeFilter } from "@/src/components/HomeFilter";
import { Text } from "@/src/components/Text";
import { useFilteredEspecies } from "@/src/services/especies.hooks";
import { TReino, TReinoEnum } from "@/src/services/especies.service";
import { themeColors, themeStyles } from "@/src/theme/theme";
import { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function HomeScreen() {
  const [filter, setFilter] = useState<TReino | null>(null);

  const {
    data: especies, // renombro data a especies
    isFetching,
    isError,
    refetch,
  } = useFilteredEspecies(filter);

  const especiesFiltradas =
    filter === null
      ? especies
      : especies.filter((especie) => especie.reino === filter);

  //
  // Event handlers
  //
  const handleRemoveFilter = () => {
    setFilter(null);
  };

  // función que recibe un parámetro y retorna otra la definición de otra función
  const handleFilter = (reino: TReino) => () => {
    setFilter(reino);
  };

  const handleReintentar = () => {
    // solo ejecuta refetch si refetch no es falsy
    refetch?.();
  };

  //
  // Render
  //
  return (
    <SafeAreaView style={themeStyles.screen}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Home</Text>
          <View style={styles.filtersContainer}>
            <Pressable onPress={handleRemoveFilter}>
              <HomeFilter filter={filter} name={null} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.ANIMALIA)}>
              <HomeFilter filter={filter} name={TReinoEnum.ANIMALIA} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.FUNGI)}>
              <HomeFilter filter={filter} name={TReinoEnum.FUNGI} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.PLANTAE)}>
              <HomeFilter filter={filter} name={TReinoEnum.PLANTAE} />
            </Pressable>
          </View>
        </View>

        {isFetching && <Text>Cargando...</Text>}
        {!isFetching && isError && (
          <View>
            <Text style={styles.textError}>Error al cargar las especies</Text>
            <Button title="Reintentar" onPress={handleReintentar} />
          </View>
        )}
        <EspecieList especies={especiesFiltradas} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeColors.textBase,
  },
  titleContainer: { gap: 35 },
  textError: {
    color: "red",
  },
});
