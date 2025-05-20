// screens/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 colunas, 16px de padding geral + 16px de margem

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      console.log("📡 Testando conexão com Firestore...");

      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("✅ Dados recebidos:", gamesList);
        setGames(gamesList);
      } catch (error) {
        console.error("❌ Erro ao buscar jogos:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogos de PS2</Text>

      {games.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum jogo encontrado.</Text>
      ) : (
        <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.imageUrl && (
                  <Image 
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.gameTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.gameDetails} numberOfLines={1}>
                  {item.year}
                </Text>
              </View>
            )}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },

  grid: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1c1c1c',
    borderRadius: 20,
    marginBottom: 32,
    marginHorizontal: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  image: {
    width: '50%',
    aspectRatio: 2 / 3, // capa padrão (ex: 200x300)
    borderRadius: 8,
  },

  gameTitle: {
  fontSize: 14,
  color: '#fff',
  marginTop: 6,
  marginBottom: 4,
  textAlign: 'center',
},
  gameDetails: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
  },
});
