import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type CharacterDetailsRouteProp = RouteProp<RootStackParamList, 'CharacterDetails'>;

interface CharacterDetailsProps {
    route: CharacterDetailsRouteProp;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ route }) => {
    const { character } = route.params;
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Character Details</Text>
                <Text style={styles.subtitle}>{character.name}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.row}>
                    <Image source={{ uri: character.image }} style={styles.characterImage} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name:</Text>
                    <Text style={styles.value}>{character.name}</Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>{character.status}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Species:</Text>
                    <Text style={styles.value}>{character.species}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>{character.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{character.location.name}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText} onPress={goBack}>Go Back</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        flex: 1,
        marginLeft: 10,
        color: '#666',
    },
    characterImage: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    buttonContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#007AFF',
    },
});

export default CharacterDetails;