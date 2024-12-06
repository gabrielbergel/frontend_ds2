import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types';

const HomeScreen = () => {
  // Use o tipo correto para o navigation
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Ponto com Reconhecimento Facial</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserRegistration')}>
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PontoRegistration')}>
        <Text style={styles.buttonText}>Registrar Ponto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllPontos')}>
        <Text style={styles.buttonText}>Ver Todos os Pontos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Relatorios')}>
        <Text style={styles.buttonText}>Ver Relatórios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', 
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 18,
    fontWeight: 'bold', 
  },
});

export default HomeScreen;