import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RegionCardProps } from 'types/entities-types';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';



const RegionCard = ({ item, onPress }: RegionCardProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.innerContainer}>
                <Bold label={'Id :'} />
                <Regular label={'productName :'} />
                <Regular label={'productDescription :'} />
            </View>
            <View style={styles.innerContainer}>
                <Bold label={`${item?.id}`} />
                <Regular label={item?.regionName} />
                <Regular numberOfLines={3} label={item?.regionDescription} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: mvs(10),
        flexDirection: 'row',
        padding: mvs(10),
        justifyContent: 'flex-start',
        borderRadius: mvs(10),
    },
    btnContainer: {
        // flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: mvs(20),
        marginBottom: mvs(30),
    },
});

export default RegionCard;
