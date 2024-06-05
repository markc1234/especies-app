import { View } from 'react-native'
import { TReino } from "@/src/services/especies.service";
import { TextNunitoSans } from './TextNunitoSans';

type HomeFilterProps = {
    filter: TReino | null,
    name: string | null,
}

export const HomeFilter = ({ filter, name}: HomeFilterProps) => {
    console.log(`${filter} y ${name} son iguales: ${filter === name}`)
    return (
        <View>
            {name ? (
            <TextNunitoSans style={{color: "white"}}>
                {name}
            </TextNunitoSans>
            ): (<TextNunitoSans style={{color: "white"}}>
                TODOS
            </TextNunitoSans>)
            }
        </View>
    )
}

