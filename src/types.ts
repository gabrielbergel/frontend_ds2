import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Definindo os parâmetros aceitos para cada rota
export type RootStackParamList = {
  Home: undefined; // Tela principal não recebe parâmetros
  UserRegistration: undefined; // Tela de cadastro de usuário não recebe parâmetros
  PontoRegistration: undefined; // Tela de registro de ponto não recebe parâmetros
  AllPontos: undefined; // Tela que exibe todos os pontos não recebe parâmetros
  Relatorios: undefined;
};

// Tipagem para a navegação da Stack
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type UserRegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserRegistration'>;
export type PontoRegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PontoRegistration'>;
export type AllPontosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AllPontos'>;
export type RelatoriosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Relatorios'>;

// Tipagem para as rotas
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type UserRegistrationScreenRouteProp = RouteProp<RootStackParamList, 'UserRegistration'>;
export type PontoRegistrationScreenRouteProp = RouteProp<RootStackParamList, 'PontoRegistration'>;
export type AllPontosScreenRouteProp = RouteProp<RootStackParamList, 'AllPontos'>;
export type RelatoriosScreenRouteProp = RouteProp<RootStackParamList, 'Relatorios'>;

// Se você planeja adicionar parâmetros no futuro, pode ser útil definir tipos para eles
// Exemplo:
// export type UserRegistrationParams = {
//   userId: string; // Exemplo de parâmetro que pode ser passado
// };