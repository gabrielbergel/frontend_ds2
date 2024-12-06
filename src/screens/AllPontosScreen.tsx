import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import axios from 'axios';

// Definindo o tipo da resposta da API
interface Ponto {
  data_hora: string;
  distancia: null | number;
  id: number;
  lat_long: string;
  reconhecido: boolean;
  status: string;
  status_display: string;
  temp_photo: string | null;
  user: null; // Ajuste conforme necessário se houver um tipo de usuário
}

const PontosScreen = () => {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await axios.get<Ponto[]>('http://192.168.1.103:8000/api/pontos/');
        console.log('Resposta da API:', response.data); // Log da resposta da API
        setPontos(response.data); // Atualizando o estado com a resposta correta
      } catch (error) {
        console.error('Erro ao buscar pontos:', error); // Log do erro
        Alert.alert('Erro', 'Erro ao buscar os pontos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPontos();
  }, []);

  // Definindo o tipo do item
  const renderItem = ({ item }: { item: Ponto }) => (
    <View style={styles.item}>
      <Text style={styles.title}>ID: {item.id}</Text>
      <Text style={styles.user}>Usuário: {item.user ? item.user.nome : 'Desconhecido'}</Text>
      <Text style={styles.status}>Status: {item.status_display}</Text>
      <Text style={styles.date}>Data e Hora: {new Date(item.data_hora).toLocaleString()}</Text>
      <Text style={styles.location}>Localização: {item.lat_long}</Text>
      {item.temp_photo ? (
        <Image source={{ uri: item.temp_photo }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>Sem imagem disponível</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pontos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  user: {
    fontSize: 18,
    color: '#333',
  },
  status: {
    fontSize: 18,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  noImage: {
    marginTop: 10,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default PontosScreen;