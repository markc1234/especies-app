import { StyleSheet, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { EspecieHome } from '../adapters/homeAdapters'
import { Link } from 'expo-router'
import { TextNunitoSans } from './TextNunitoSans'

// export const defaultImage = "https://img.icons8.com/?size=100&id=j1UxMbqzPi7n&format=png&color=000000"

const defaultImage = "https://s3-alpha-sig.figma.com/img/99d9/973e/5a2c716c34ac7de430b266089a11d1d0?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GUgZxGzod9C3~HrN8ye6b2Yn4MnS-mollfawYFuva2OCKEoiaOqxbgttkyIHrugCS1efsI5pij6twqyrYPO-LjT~7GLYp35jEnmzjdaXRVmcsIFzXlODIBAEQhKVotfZjvE3HFESuKIk6NFLLwMlaNfaVly~mAf2qMrFK8JAY0WEwoeeoWnTY5nLEY3qYRKpf4BZPTpMJXJTD8brkvFslUkNICKvjOrjgP7cpbXKLQB3lZU~hoJupXXOx5aFHvGpzaNlji8fFAe-UrXjVoDWJWrZSIHwjKNYw5XxlwwFerJEl4E5Yh0CocBMZpa3CHwQnTxGu1TtPxVTqX3iXyCbVQ__"

type EspecieListItemProp = {
    especie: EspecieHome
}

const EspecieListItem = ({ especie }: EspecieListItemProp) => {
    return (
        <Link href={`especie/${especie.sp_id}`} asChild>
            <Pressable style={ styles.container }>
                <Image 
                    source={{ uri: especie.imagen || defaultImage}}
                    style={ styles.image }
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