import React, { useState } from 'react';
import { View, Button, TextInput, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

// Definindo o tipo da resposta da API
interface UsuarioResponse {
  foto: string;
}

const UserRegistrationScreen = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // Função para capturar a foto usando a câmera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar a câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      const manipulatedImage = await ImageManipulator.manipulateAsync(uri, [], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });
      setImage(manipulatedImage.uri);
    }
  };

  // Função para enviar os dados ao backend
  const handleRegister = async () => {
    if (!nome || !cpf || !cargo || !image) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos e tire a foto!');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('cargo', cargo);

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append('foto', blob, 'user-photo.jpg');

      const apiUrl = 'http://192.168.1.103:8000/api/usuarios/';
      const responseApi = await axios.post<UsuarioResponse>(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (responseApi.status === 200 || responseApi.status === 201) {
        const fotoUrl = responseApi.data.foto;
        Alert.alert('Sucesso', `Usuário registrado com sucesso! Foto URL: ${fotoUrl}`);
        // Limpar os campos após o registro
        setNome('');
        setCpf('');
        setCargo('');
        setImage(null);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao registrar o usuário.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de comunicação com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Cargo"
        value={cargo}
        onChangeText={setCargo}
        style={styles.input}
      />
      <Button title="Tirar Foto" onPress={takePhoto} />
      {image && (
        <Image source={{ uri: image }} 
        style={styles.image} />
      )}
      <Button title="Registrar Usuário" onPress={handleRegister} />
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

export default UserRegistrationScreen;