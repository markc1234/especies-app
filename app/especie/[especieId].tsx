import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { useEspecie } from "@/src/services/especies.hooks";
import { themeColors, themeStyles } from "@/src/theme/theme";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/src/components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function EspecieShowScreen() {
  const { height } = useWindowDimensions();
  const searchParams = useLocalSearchParams();

  const spId =
    typeof searchParams.especieId === "string"
      ? parseInt(searchParams.especieId)
      : 1;

  const { data: especie, isFetching, isError } = useEspecie(spId);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>Cargando...</TextNunitoSans>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>ERROR!</TextNunitoSans>
      </View>
    );
  }

  if (!especie) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>La especie no existe</TextNunitoSans>
      </View>
    );
  }

  const defaultImage = "https://s3-alpha-sig.figma.com/img/99d9/973e/5a2c716c34ac7de430b266089a11d1d0?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GUgZxGzod9C3~HrN8ye6b2Yn4MnS-mollfawYFuva2OCKEoiaOqxbgttkyIHrugCS1efsI5pij6twqyrYPO-LjT~7GLYp35jEnmzjdaXRVmcsIFzXlODIBAEQhKVotfZjvE3HFESuKIk6NFLLwMlaNfaVly~mAf2qMrFK8JAY0WEwoeeoWnTY5nLEY3qYRKpf4BZPTpMJXJTD8brkvFslUkNICKvjOrjgP7cpbXKLQB3lZU~hoJupXXOx5aFHvGpzaNlji8fFAe-UrXjVoDWJWrZSIHwjKNYw5XxlwwFerJEl4E5Yh0CocBMZpa3CHwQnTxGu1TtPxVTqX3iXyCbVQ__";

  return (
    <SafeAreaView style={themeStyles.screen}>
      <ImageBackground source={{ uri: especie.imagen || defaultImage }} style={styles.imageBackground}>
        <LinearGradient
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          colors={[
            "rgba(48,49,45,1)",
            "rgba(48,49,45,0.9)",
            "rgba(30,31,24,0)",
          ]}
          locations={[0, 0.34, 0.68]}
          style={styles.linearGradient}
        >
          <TextNunitoSans style={styles.title}>{especie.nombre_cientifico}</TextNunitoSans>
        </LinearGradient>
      </ImageBackground>

      <View style={[styles.infoContainer, { height: height - 300 }]}>
        <TextNunitoSans style={styles.label}>ID: <TextNunitoSans style={styles.white}>{especie.sp_id}</TextNunitoSans></TextNunitoSans>
        <TextNunitoSans style={styles.label}>Reino: <TextNunitoSans style={styles.white}>{especie.reino}</TextNunitoSans></TextNunitoSans>
        <TextNunitoSans style={styles.label}>Phy/Div: <TextNunitoSans style={styles.white}>{especie.phydiv || '-'}</TextNunitoSans></TextNunitoSans>
        <TextNunitoSans style={styles.label}>Clase: <TextNunitoSans style={styles.white}>{especie.clase}</TextNunitoSans></TextNunitoSans>
        <TextNunitoSans style={styles.label}>Orden: <TextNunitoSans style={styles.white}>{especie.orden}</TextNunitoSans></TextNunitoSans>
        <TextNunitoSans style={styles.label}>Familia: <TextNunitoSans style={styles.white}>{especie.familia}</TextNunitoSans></TextNunitoSans>
        <TextNunitoSans style={styles.label}>Origen: <TextNunitoSans style={styles.white}>{especie.origen}</TextNunitoSans></TextNunitoSans>
      </View>
      
      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Reportar avistaje"
          handlePress={() => router.navigate("/report")}
          containerStyles={styles.buttonContainer}
          textStyles={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    height: 300,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeColors.textBase,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "black",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  label: {
    color: themeColors.primary,
    fontSize: 12,
    marginBottom: 5,
  },
  white: {
    color: themeColors.textBase,
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    backgroundColor: themeColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: themeColors.textBase,
    fontSize: 16,
    fontWeight: "bold",
  },
});
