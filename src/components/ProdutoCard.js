// Arquivo: src/components/ProdutoCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Componente reutilizável que recebe o objeto 'produto', o status 'noCarrinho' e a função 'onPress'
export default function ProdutoCard({ produto, noCarrinho = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, noCarrinho && styles.cardNoCarrinho]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.imagemContainer}>
        <Image
          source={{ uri: produto.image }}
          style={styles.imagem}
          resizeMode="contain"
        />
      </View>

      <View style={styles.linhaTags}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagCategoriaTexto}>{produto.category}</Text>
        </View>

        {noCarrinho && (
          <View style={styles.badgeCarrinho}>
            <Text style={styles.badgeCarrinhoTexto}>✓ No carrinho</Text>
          </View>
        )}
      </View>

      <Text style={styles.titulo} numberOfLines={2}>
        {produto.title}
      </Text>

      <View style={styles.rodape}>
        <Text style={styles.preco}>R$ {Number(produto.price).toFixed(2)}</Text>
        <Text style={styles.linkDetalhes}>Ver detalhes →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardNoCarrinho: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  imagemContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  linhaTags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagCategoria: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagCategoriaTexto: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  badgeCarrinho: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeCarrinhoTexto: {
    color: '#047857',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 12,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  preco: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 'bold',
  },
  linkDetalhes: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: 'bold',
  },
});
