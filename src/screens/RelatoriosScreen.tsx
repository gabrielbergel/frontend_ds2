import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {Buffer} from "buffer";

const RelatoriosScreen = () => {
  const downloadReport = async (type: 'pdf' | 'excel') => {
    const url = type === 'pdf' 
      ? 'http://192.168.1.103:8000/relatorio-pontos-pdf/' 
      : 'http://192.168.1.103:8000/relatorio-pontos-excel/';

    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer', // Use arraybuffer para arquivos binários
      });

      // Criar um arquivo temporário
      const fileUri = `${FileSystem.documentDirectory}${type === 'pdf' ? 'relatorio_ponto.pdf' : 'relatorio_ponto.xlsx'}`;
      
      // Converter a resposta para base64
      const base64Data = Buffer.from(response.data as ArrayBuffer).toString('base64');
      await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      // Compartilhar o arquivo
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Erro ao baixar o relatório:', error);
      Alert.alert('Erro', 'Não foi possível baixar o relatório. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios de Pontos</Text>
      <Button title="Baixar Relatório em PDF" onPress={() => downloadReport('pdf')} />
      <Button title="Baixar Relatório em Excel" onPress={() => downloadReport('excel')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RelatoriosScreen;