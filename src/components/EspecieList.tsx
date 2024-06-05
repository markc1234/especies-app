import { FlatList } from 'react-native'
import { EspecieHome } from '../adapters/homeAdapters'
import EspecieListItem from "@/src/components/EspecieListItem"

import { SafeAreaView } from "react-native-safe-area-context";

type EspecieListProp = {
    especies: EspecieHome[]
}

const EspecieList = ({ especies }: EspecieListProp) => {
  return (
      <FlatList 
          data={especies}
          renderItem={({ item }) => <EspecieListItem especie={item}/>}
          numColumns={2}
          contentContainerStyle={{ gap: 20 }}
          columnWrapperStyle={{ gap: 32 }}
      />
  )
}

export default EspecieList