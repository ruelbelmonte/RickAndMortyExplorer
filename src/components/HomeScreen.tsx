import React, { useState } from 'react';
import { FlatList, ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCharacterData from '../hooks/useCharacterData';
import { Character } from '../types/characterTypes';
import CharacterItem from './CharacterItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import SearchBar from './SearchBar';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const { characters, loadMoreCharacters, isLoading, setFilter } = useCharacterData();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const handleSearch = (term: string) => {
        setFilter(term);
    };

    const handleCharacterPress = (character: Character) => {
        navigation.navigate('CharacterDetails', { character });
    };

    return (
        <View style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
            <FlatList
                data={characters}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCharacterPress(item as Character)}>
                        <CharacterItem character={item as Character} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                onEndReached={loadMoreCharacters}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                    !isLoading ? (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No results found</Text>
                        </View>
                    ) : null
                }
                ListFooterComponent={
                    isLoading ? (
                        <View style={{ padding: 10 }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultsText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default HomeScreen;