// Arquivo: src/screens/DetalhesProdutoScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function DetalhesProdutoScreen({
  route,
  navigation,
  carrinho = [],
  onToggleCarrinho,
}) {
  // Extraindo o objeto 'produto' enviado pela tela anterior via route.params
  const { produto } = route.params;

  // Verifica se o produto já está no estado compartilhado do carrinho (no App.js)
  const adicionado = carrinho.some((item) => item.id === produto.id);

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {/* Imagem Ampliada do Produto */}
      <View style={styles.imagemBox}>
        <Image
          source={{ uri: produto.image }}
          style={styles.imagem}
          resizeMode="contain"
        />
      </View>

      {/* Badge de Categoria */}
      <View style={styles.tag}>
        <Text style={styles.tagTexto}>{produto.category}</Text>
      </View>

      {/* Título Completo */}
      <Text style={styles.titulo}>{produto.title}</Text>

      {/* Painel de Informações Gerais */}
      <View style={styles.infoBox}>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Preço:</Text>
          <Text style={styles.precoValor}>
            R$ {Number(produto.price).toFixed(2)}
          </Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Avaliação:</Text>
          <Text style={styles.infoValor}>
            ★ {produto.rating?.rate ?? 'N/A'} / 5
            {produto.rating?.count ? ` (${produto.rating.count} avaliações)` : ''}
          </Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Categoria:</Text>
          <Text style={[styles.infoValor, styles.categoriaValor]}>
            {produto.category}
          </Text>
        </View>
      </View>

      {/* Descrição Completa */}
      <Text style={styles.subtitulo}>Descrição do Produto</Text>
      <View style={styles.descricaoBox}>
        <Text style={styles.descricao}>{produto.description}</Text>
      </View>

      {/* Botão de Ação Principal ligado ao estado global do carrinho */}
      <TouchableOpacity
        style={[styles.botaoCarrinho, adicionado && styles.botaoAdicionado]}
        onPress={() => onToggleCarrinho(produto)}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBotao}>
          {adicionado ? '✓ No Carrinho (Remover)' : 'Adicionar ao Carrinho'}
        </Text>
      </TouchableOpacity>

      {/* Botão Programático de Retorno (goBack) */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.textoVoltar}>← Continuar Comprando</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  imagemBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagTexto: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 22,
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 14,
  },
  infoValor: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoriaValor: {
    textTransform: 'capitalize',
  },
  precoValor: {
    color: '#059669',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  descricaoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  descricao: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  botaoCarrinho: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoAdicionado: {
    backgroundColor: '#059669',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoVoltar: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoVoltar: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 14,
  },
});
