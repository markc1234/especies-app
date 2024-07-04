import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { useEspecie } from "@/src/services/especies.hooks";
import { themeColors, themeStyles } from "@/src/theme/theme";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/src/components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";

export default function EspecieShowScreen() {
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

  const heartImage = require('../../assets/images/Heart.png');

  return (
    <SafeAreaView style={themeStyles.screen}>
      <ImageBackground 
        source={{ uri: especie.imagen || undefined }} 
        style={styles.imageBackground}
        placeholder={require("@/assets/images/placeholder.png")}
        >
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

          <View style={styles.headerButtons}>

            <TouchableOpacity activeOpacity={0.9} onPress={() => router.back()} style={styles.backButton}>
              <FontAwesome name="chevron-circle-left" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.likeButton}>
              <Image source={heartImage} style={styles.likeIcon} />
              <TextNunitoSans style={styles.like}>0 likes</TextNunitoSans>
            </TouchableOpacity>
      
          </View>

          <TextNunitoSans style={styles.title}>{especie.nombre_cientifico}</TextNunitoSans>
        </LinearGradient>
      </ImageBackground>


      <View style={styles.infoContainer}>
        <View style={{padding: 15, flexDirection: "row", gap: 10}}>
          <View style={{ alignItems: "flex-end"}}>
            <TextNunitoSans style={styles.label}>ID:</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Reino: </TextNunitoSans>
            <TextNunitoSans style={styles.label}>Phy/Div: </TextNunitoSans>
            <TextNunitoSans style={styles.label}>Clase: </TextNunitoSans>
            <TextNunitoSans style={styles.label}>Orden: </TextNunitoSans>
            <TextNunitoSans style={styles.label}>Familia: </TextNunitoSans>
            <TextNunitoSans style={styles.label}>Origen: </TextNunitoSans>
          </View>
          <View>
            <TextNunitoSans style={[styles.detailText]}>{especie.sp_id}</TextNunitoSans>
            <TextNunitoSans style={[styles.detailText]}>{especie.reino}</TextNunitoSans>
            <TextNunitoSans style={[styles.detailText]}>{especie.phydiv || '-'}</TextNunitoSans>
            <TextNunitoSans style={[styles.detailText]}>{especie.clase}</TextNunitoSans>
            <TextNunitoSans style={[styles.detailText]}>{especie.orden}</TextNunitoSans>
            <TextNunitoSans style={[styles.detailText]}>{especie.familia}</TextNunitoSans>
            <TextNunitoSans style={[styles.detailText]}>{especie.origen}</TextNunitoSans>
          </View>
          
        </View>
        
        <View style={styles.buttonWrapper}>
        <CustomButton
          title="Reportar avistaje"
          handlePress={() => router.navigate(`/report?reportSpId=${especie.sp_id}`)}
          containerStyles={styles.buttonContainer}
        />


        </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: themeColors.textBase,
  },
  containerDetail: {
    top: -30,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "black",
    marginTop: -30,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  label: {
    color: themeColors.primary,
    fontSize: 12,
    marginBottom: 5,
  },
  detailText: {
    color: themeColors.textBase,
    marginBottom: 5,
    fontSize: 12,
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
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
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  backButton: {
    top: 7,
    left: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  likeIcon: {
    width: 14,
    height: 14,
    marginRight: 9,
  },
  like: {
    fontSize: 12,
    color: "black",
  },
});
