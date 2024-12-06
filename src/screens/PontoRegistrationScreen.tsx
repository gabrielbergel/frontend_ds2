import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Image, Alert, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

// Definindo o tipo da resposta da API
interface PontoResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user: null | string;
    lat_long: string;
    data_hora: string;
    temp_photo: string;
    status: string;
    status_display: string;
    reconhecido: boolean;
    distancia: null | number;
  };
}

const PontoRegistrationScreen = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [latLong, setLatLong] = useState<string>('');
  const [status, setStatus] = useState<string>('entrada');
  const [image, setImage] = useState<string | null>(null);

  // Função para obter a localização do usuário
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos da sua permissão para acessar a localização.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatLong(`${location.coords.latitude}, ${location.coords.longitude}`);
  };

  // Função para capturar a foto usando a câmera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar a câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  // Função para enviar os dados ao backend
  const handleRegister = async () => {
    if (!userId || !latLong || !image) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos e tire a foto!');
      return;
    }
  
    const formData = new FormData();
    formData.append('user', String(userId)); // Adicionando o ID do usuário
    formData.append('lat_long', latLong); // Corrigido para 'lat_long'
    formData.append('status', status);
    formData.append('data_hora', new Date().toISOString()); // Adicionando a data e hora atual
  
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append('temp_photo', blob, 'ponto-photo.jpg'); // Corrigido para 'temp_photo'
  
      const apiUrl = 'http://192.168.1.103:8000/api/pontos/'; // URL da API para registrar ponto
      const responseApi = await axios.post<PontoResponse>(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (responseApi.status === 200 || responseApi.status === 201) {
        Alert.alert('Sucesso', 'Ponto registrado com sucesso!');
        // Limpar os campos após o registro
        setUserId(null);
        setLatLong('');
        setStatus('entrada');
        setImage(null);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao registrar o ponto.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de comunicação com o servidor.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ID do Usuário"
        value={userId ? String(userId) : ''}
        onChangeText={(text) => setUserId(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Latitude, Longitude"
        value={latLong}
        editable={false}
        style={styles.input}
      />
      <Text>Status: {status === 'entrada' ? 'Entrada' : 'Saída'}</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={{ height: 50, marginBottom: 10 }}
      >
        <Picker.Item label="Entrada" value="entrada" />
        <Picker.Item label="Saída" value="saida" />
      </Picker>

      <Button title="Tirar Foto" onPress={takePhoto} />
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <Button title="Registrar Ponto" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default PontoRegistrationScreen;