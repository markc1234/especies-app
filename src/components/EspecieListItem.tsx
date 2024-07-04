import { StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { EspecieHome } from '../adapters/homeAdapters'
import { Link } from 'expo-router'
import { TextNunitoSans } from './TextNunitoSans'

type EspecieListItemProp = {
    especie: EspecieHome
}

const EspecieListItem = ({ especie }: EspecieListItemProp) => {

    return (
        <Link href={`especie/${especie.sp_id}`} asChild>
            <Pressable style={ styles.container }>
                <Image 
                    source={{ uri: especie.imagen || undefined }}
                    placeholder={require("@/assets/images/placeholder.png")}
                    style={ styles.image }
                    placeholderContentFit="cover"
                />

                <TextNunitoSans style={styles.title}>{especie.nombre_cientifico}</TextNunitoSans>
            </Pressable>
        </Link>
    )
}

export default EspecieListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636',
        borderRadius: 17,
        padding: 10,
        overflow: 'hidden',
        flex: 1,
        // las columnas ocupan el 50% del tamaño
        maxWidth: "50%",
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        alignSelf: "center",
        borderRadius: 14
    },
    title: {
        fontWeight: '600',
        fontSize: 9,
        marginVertical: 10,
    },
})