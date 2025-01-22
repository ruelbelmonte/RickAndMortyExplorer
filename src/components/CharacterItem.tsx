import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Character } from '../types/characterTypes';


interface CharacterItemProps {
  character: Character;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ character }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <Text style={styles.characterName}>{character.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  characterImage: {
    width: 60,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CharacterItem;