import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { OrganizationCardProps } from 'types/entities-types';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';



const OrganizationCard = ({ item, onPress }: OrganizationCardProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.innerContainer}>
                <Bold label={'Id :'} />
                <Regular label={'Organization Name :'} />
                <Regular label={'Organization Description :'} />
            </View>
            <View style={styles.innerContainer}>
                <Bold label={`${item?.id}`} />
                <Regular label={item?.orgName} />
                <Regular numberOfLines={3} label={item?.orgDescription} />
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

});

export default OrganizationCard;
