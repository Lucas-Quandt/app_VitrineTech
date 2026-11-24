// Arquivo: App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import VitrineScreen from './src/screens/VitrineScreen';
import DetalhesProdutoScreen from './src/screens/DetalhesProdutoScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pilha interna da aba Vitrine (Lista de Produtos -> Detalhes do Produto)
function VitrineStack({ carrinho, onToggleCarrinho }) {
  return (
    <Stack.Navigator
      initialRouteName="Vitrine"
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Vitrine" options={{ title: 'VitrineTech' }}>
        {(props) => <VitrineScreen {...props} carrinho={carrinho} />}
      </Stack.Screen>

      <Stack.Screen
        name="DetalhesProduto"
        options={{ title: 'Detalhes do Produto' }}
      >
        {(props) => (
          <DetalhesProdutoScreen
            {...props}
            carrinho={carrinho}
            onToggleCarrinho={onToggleCarrinho}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  // Estado compartilhado do carrinho (array de objetos completos de produto)
  const [carrinho, setCarrinho] = useState([]);

  function alternarCarrinho(produto) {
    setCarrinho((listaAtual) => {
      const jaExiste = listaAtual.some((item) => item.id === produto.id);
      if (jaExiste) {
        return listaAtual.filter((item) => item.id !== produto.id);
      }
      return [...listaAtual, produto];
    });
  }

  function removerDoCarrinho(produtoId) {
    setCarrinho((listaAtual) =>
      listaAtual.filter((item) => item.id !== produtoId)
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#64748B',
          tabBarStyle: {
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let nomeIcone = 'storefront-outline';
            if (route.name === 'VitrineTab') {
              nomeIcone = focused ? 'storefront' : 'storefront-outline';
            } else if (route.name === 'CarrinhoTab') {
              nomeIcone = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={nomeIcone} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="VitrineTab"
          options={{
            title: 'Vitrine',
            headerShown: false,
          }}
        >
          {() => (
            <VitrineStack
              carrinho={carrinho}
              onToggleCarrinho={alternarCarrinho}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="CarrinhoTab"
          options={{
            title: 'Carrinho',
            headerTitle: 'Meu Carrinho',
            headerStyle: { backgroundColor: '#0F172A' },
            headerTintColor: '#F8FAFC',
            headerTitleStyle: { fontWeight: 'bold' },
            tabBarBadge: carrinho.length > 0 ? carrinho.length : undefined,
          }}
        >
          {(props) => (
            <CarrinhoScreen
              {...props}
              carrinho={carrinho}
              onRemoverDoCarrinho={removerDoCarrinho}
              onLimparCarrinho={limparCarrinho}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
