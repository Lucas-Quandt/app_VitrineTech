// Arquivo: src/screens/VitrineScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ProdutoCard from '../components/ProdutoCard';
import { PRODUTOS_FALLBACK } from '../data/produtosFallback';

const API_URL = 'https://fakestoreapi.com/products?limit=10';

export default function VitrineScreen({ navigation, carrinho = [] }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usandoFallback, setUsandoFallback] = useState(false);

  async function buscarProdutos() {
    try {
      setCarregando(true);
      setUsandoFallback(false);

      const resposta = await fetch(API_URL);
      if (!resposta.ok) {
        throw new Error('Falha ao carregar os produtos da loja.');
      }

      const dados = await resposta.json();
      setProdutos(dados);
    } catch (error) {
      // Caso a API falhe ou esteja sem conexão, carrega os produtos de fallback
      setProdutos(PRODUTOS_FALLBACK);
      setUsandoFallback(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoStatus}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      {usandoFallback && (
        <View style={styles.avisoFallback}>
          <Text style={styles.avisoFallbackTexto}>
            Sem acesso à API. Exibindo catálogo local.
          </Text>
          <TouchableOpacity onPress={buscarProdutos} activeOpacity={0.8}>
            <Text style={styles.avisoFallbackBotao}>Tentar API</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <ProdutoCard
            produto={item}
            noCarrinho={carrinho.some((p) => p.id === item.id)}
            onPress={() =>
              navigation.navigate('DetalhesProduto', { produto: item })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  avisoFallback: {
    backgroundColor: '#FEF3C7',
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avisoFallbackTexto: {
    color: '#92400E',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  avisoFallbackBotao: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: 'bold',
  },
  lista: {
    padding: 16,
    paddingBottom: 24,
  },
  centralizado: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  textoStatus: {
    marginTop: 12,
    fontSize: 15,
    color: '#475569',
    fontWeight: '600',
  },
});
