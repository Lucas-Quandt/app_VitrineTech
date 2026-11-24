// Arquivo: src/screens/CarrinhoScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CarrinhoScreen({
  navigation,
  carrinho = [],
  onRemoverDoCarrinho,
  onLimparCarrinho,
}) {
  // Calcula o valor total somado dos produtos no carrinho usando .reduce()
  const valorTotal = carrinho.reduce(
    (acumulador, item) => acumulador + Number(item.price),
    0
  );

  function finalizarPedido() {
    const quantidade = carrinho.length;
    const totalFormatado = valorTotal.toFixed(2);

    onLimparCarrinho();

    Alert.alert(
      'Pedido Finalizado!',
      `Sua compra de ${quantidade} ${
        quantidade === 1 ? 'item' : 'itens'
      } no valor total de R$ ${totalFormatado} foi confirmada com sucesso.`
    );
  }

  return (
    <View style={styles.tela}>
      {/* Card de resumo com quantidade de itens e valor total */}
      <View style={styles.resumoCard}>
        <View style={styles.resumoBloco}>
          <Text style={styles.resumoNumero}>{carrinho.length}</Text>
          <Text style={styles.resumoLabel}>Itens no Carrinho</Text>
        </View>
        <View style={styles.divisorVertical} />
        <View style={styles.resumoBloco}>
          <Text style={styles.resumoValor}>R$ {valorTotal.toFixed(2)}</Text>
          <Text style={styles.resumoLabel}>Valor Total</Text>
        </View>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={
          carrinho.length === 0 ? styles.listaVaziaContainer : styles.lista
        }
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Ionicons name="cart-outline" size={56} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Seu carrinho está vazio</Text>
            <Text style={styles.vazioSubtitulo}>
              Explore a vitrine de produtos e adicione itens para montar seu pedido.
            </Text>
            <TouchableOpacity
              style={styles.botaoIrVitrine}
              onPress={() => navigation.navigate('VitrineTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoIrVitrine}>Ir para a Vitrine</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemTopo}>
              <View style={styles.miniaturaBox}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.miniatura}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemCategoria}>{item.category}</Text>
                <Text style={styles.itemTitulo} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.itemPreco}>
                  R$ {Number(item.price).toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.acoesLinha}>
              <TouchableOpacity
                style={styles.botaoDetalhes}
                onPress={() =>
                  navigation.navigate('VitrineTab', {
                    screen: 'DetalhesProduto',
                    params: { produto: item },
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoDetalhes}>Ver Detalhes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => onRemoverDoCarrinho(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" />
                <Text style={styles.textoBotaoRemover}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Rodapé com botão de Finalizar Pedido quando houver itens */}
      {carrinho.length > 0 && (
        <View style={styles.rodapePedido}>
          <TouchableOpacity
            style={styles.botaoFinalizar}
            onPress={finalizarPedido}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.textoBotaoFinalizar}>
              Finalizar Pedido (R$ {valorTotal.toFixed(2)})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  resumoCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  resumoBloco: {
    flex: 1,
    alignItems: 'center',
  },
  resumoNumero: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#38BDF8',
  },
  resumoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34D399',
  },
  resumoLabel: {
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: 4,
  },
  divisorVertical: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  vazioBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  vazioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 14,
  },
  vazioSubtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  botaoIrVitrine: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  textoBotaoIrVitrine: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniaturaBox: {
    width: 72,
    height: 72,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  miniatura: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
  },
  itemCategoria: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  itemTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 20,
  },
  itemPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginTop: 6,
  },
  acoesLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 10,
  },
  botaoDetalhes: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoDetalhes: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoRemover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  textoBotaoRemover: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 13,
  },
  rodapePedido: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  botaoFinalizar: {
    backgroundColor: '#059669',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  textoBotaoFinalizar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
