import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TReino } from "@/src/services/especies.service";
import { TextNunitoSans } from './TextNunitoSans';
import { themeColors } from "@/src/theme/theme";

type HomeFilterProps = {
    name: string | null;
    isSelected: boolean;
};

export const HomeFilter = ({ name, isSelected }: HomeFilterProps) => {
    return (
        <View style={[styles.filterContainer, isSelected && styles.selectedContainer]}>
        <TextNunitoSans style={styles.text}>
            {name ? name : "TODOS"}
        </TextNunitoSans>
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    selectedContainer: {
        borderBottomWidth: 2,
        borderBottomColor: themeColors.primary,
    },
    text: {
        fontSize: 10,
    }
});