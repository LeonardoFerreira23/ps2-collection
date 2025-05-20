// screens/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.gameTitle}>{item.title}</Text>
              <Text style={styles.gameDetails}>
                {item.year} • {Array.isArray(item.genre) ? item.genre.join(", ") : item.genre}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
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
  card: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
