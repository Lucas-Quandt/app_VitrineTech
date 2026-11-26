# 🛍️ VitrineTech

Aplicativo mobile de vitrine de produtos com navegação por **Abas Inferiores (Bottom Tabs)**, **Pilha de Telas (Native Stack)**, consumo de **API REST** com fallback local e **carrinho de compras com estado compartilhado**, desenvolvido em **React Native** com **Expo**.

---

## 📋 Sobre o Projeto

O **VitrineTech** simula um aplicativo de e-commerce onde o usuário pode explorar produtos carregados da [Fake Store API](https://fakestoreapi.com/), visualizar detalhes completos de cada item, adicionar ou remover produtos do carrinho e finalizar o pedido com cálculo automático do valor total.

O projeto foi construído em etapas evolutivas:

1. **Navegação em Pilha (Stack Navigation) + API REST:** Listagem de produtos da Fake Store API com indicador de carregamento (`ActivityIndicator`), cards reutilizáveis (`ProdutoCard`) e passagem de parâmetros entre telas (`VitrineScreen` → `DetalhesProdutoScreen`).
2. **Navegação por Abas Inferiores (Bottom Tabs) + Carrinho Compartilhado:** Adição de `Tab.Navigator` com ícones vetoriais (`Ionicons`), badge dinâmico com a quantidade de itens no carrinho, fallback local caso a API fique indisponível e tela completa de carrinho (`CarrinhoScreen`) com soma automática e finalização de pedido.
3. **Persistência Local com AsyncStorage:** Gravação automática do carrinho na memória interna do dispositivo com a chave `'@vitrine_tech:carrinho'`, restauração segura na inicialização com `ActivityIndicator` e botão **Esvaziar** com confirmação via `Alert`.

---

## ✨ Funcionalidades

- **Catálogo via API REST com Fallback Offline:**
  - Busca produtos em `https://fakestoreapi.com/products?limit=10`.
  - Exibe tela de carregamento (`ActivityIndicator`) enquanto consulta a API.
  - Caso a requisição falhe ou o dispositivo esteja sem internet, carrega automaticamente os dados locais de [`src/data/produtosFallback.js`](src/data/produtosFallback.js) e exibe um aviso com botão para tentar reconectar à API.
- **Navegação Combinada (Bottom Tabs + Native Stack):**
  - **Aba Vitrine (`VitrineTab`):** contém uma pilha interna (`VitrineStack`) com as telas **VitrineTech** e **Detalhes do Produto**, ocultando o cabeçalho da aba (`headerShown: false`) para evitar cabeçalho duplo.
  - **Aba Carrinho (`CarrinhoTab`):** exibe o badge dinâmico (`tabBarBadge`) sempre que houver pelo menos 1 item adicionado.
  - Ícones preenchidos quando a aba está ativa e contornados quando inativa (`storefront` / `storefront-outline` e `cart` / `cart-outline`).
- **Destaque Visual nos Cards:**
  - Produtos já presentes no carrinho recebem borda e fundo esverdeados com o selo `✓ No carrinho`.
- **Tela de Detalhes do Produto:**
  - Mostra imagem ampliada, categoria, título completo, preço, avaliação (`rating.rate` e `rating.count`) e descrição.
  - Botão principal sincronizado com o estado compartilhado do carrinho (`Adicionar ao Carrinho` / `✓ No Carrinho (Remover)`).
  - Botão `← Continuar Comprando` utilizando `navigation.goBack()`.
- **Tela de Carrinho (`CarrinhoScreen`):**
  - Card de resumo no topo com **quantidade de itens** e **Valor Total (`R$`)** calculado dinamicamente com `.reduce()`.
  - Lista de itens em `FlatList` com miniatura, categoria, título, preço, botão **Ver Detalhes** (navegação cruzada para `VitrineTab` → `DetalhesProduto`) e botão **Remover**.
  - Estado vazio amigável com ícone e botão **Ir para a Vitrine**.
  - Botão **Esvaziar** no rodapé (ao lado de **Finalizar Pedido**) com confirmação via `Alert` para remover todos os itens e limpar a chave salva no dispositivo.
  - Botão **Finalizar Pedido** que limpa o carrinho (e remove a chave no `AsyncStorage`) e apresenta um `Alert` de confirmação com resumo da compra.
- **Persistência Local (`AsyncStorage`):**
  - Salva automaticamente os itens do carrinho sob a chave `'@vitrine_tech:carrinho'` usando `JSON.stringify`.
  - Restaura os itens salvos na inicialização com `AsyncStorage.getItem` e `JSON.parse`, exibindo `ActivityIndicator` até a leitura concluir para evitar sobrescrita inicial.
  - Remove a chave com `AsyncStorage.removeItem` sempre que o carrinho fica vazio (removendo o último item, esvaziar ou finalizar pedido).

---

## 🛠️ Tecnologias e Bibliotecas

| Tecnologia | Versão | Uso no Projeto |
| :--- | :--- | :--- |
| **React** | `18.3.1` | Biblioteca base de UI e hooks (`useState`, `useEffect`) |
| **React Native** | `0.76.5` | Componentes nativos (`View`, `Text`, `FlatList`, `Image`, `ScrollView`, `TouchableOpacity`, `Alert`, `ActivityIndicator`) |
| **Expo** | `~52.0.0` | Toolchain, Metro Bundler e execução via Expo Go |
| **@react-native-async-storage/async-storage** | `1.23.1` | Persistência local do carrinho no dispositivo (`@vitrine_tech:carrinho`) |
| **@react-navigation/native** | `^7.0.0` | Container e núcleo de navegação |
| **@react-navigation/native-stack** | `^7.0.0` | Navegação em pilha (`Vitrine` → `DetalhesProduto`) |
| **@react-navigation/bottom-tabs** | `^7.0.0` | Barra de abas inferiores (`VitrineTab` e `CarrinhoTab`) |
| **@expo/vector-icons** | `~14.0.4` | Conjunto de ícones `Ionicons` |
| **expo-font** | `~13.0.4` | Carregamento das fontes de ícones |
| **expo-asset** | `~11.0.5` | Suporte a assets no Metro Bundler |
| **react-native-screens** | `~4.4.0` | Otimização nativa de telas para React Navigation |
| **react-native-safe-area-context** | `4.12.0` | Controle de áreas seguras em dispositivos móveis |

---

## 📁 Estrutura de Pastas

```text
app_VitrineTech/
├── App.js                             # Navegação principal (Tab + Stack) e estado compartilhado do carrinho
├── index.js                           # Ponto de entrada do Expo (registerRootComponent)
├── app.json                           # Configurações do projeto Expo
├── package.json                       # Dependências e scripts npm
├── .gitignore                         # Arquivos ignorados pelo Git
├── README.md                          # Documentação do projeto
└── src/
    ├── data/
    │   └── produtosFallback.js        # Lista local de produtos (fallback offline)
    ├── components/
    │   └── ProdutoCard.js             # Card reutilizável de produto com destaque de item no carrinho
    └── screens/
        ├── VitrineScreen.js           # Tela inicial com consumo da API + FlatList
        ├── DetalhesProdutoScreen.js   # Tela de detalhes com adição/remoção do carrinho
        └── CarrinhoScreen.js          # Tela do carrinho com total (.reduce), remoção e finalização
```

---

## 🧭 Arquitetura de Navegação e Estado

```text
NavigationContainer (App.js)
└── Tab.Navigator  [estado compartilhado: carrinho, alternarCarrinho, removerDoCarrinho, limparCarrinho]
    ├── VitrineTab (headerShown: false)
    │   └── Stack.Navigator (VitrineStack)
    │       ├── Vitrine (VitrineScreen)
    │       └── DetalhesProduto (DetalhesProdutoScreen)
    └── CarrinhoTab (tabBarBadge: carrinho.length)
        └── CarrinhoScreen
```

O estado `carrinho` fica elevado em [`App.js`](App.js) (padrão *lifting state up*) para que:
1. Ao adicionar ou remover um produto em **DetalhesProdutoScreen**, o **badge da aba Carrinho**, o destaque do card em **VitrineScreen** e a lista em **CarrinhoScreen** sejam atualizados instantaneamente.
2. Ao remover um item ou finalizar o pedido em **CarrinhoScreen**, todas as telas reflitam o novo estado automaticamente.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado — v18 ou superior)
- **npm** (instalado junto com o Node.js)
- **Git**
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) **ou** emulador Android/iOS configurado

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Lucas-Quandt/app_VitrineTech.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd app_VitrineTech
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor Expo (com limpeza de cache recomendada na primeira execução):**
   ```bash
   npx expo start -c
   ```

5. **Abra o aplicativo:**
   - **No celular físico:** escaneie o QR Code exibido no terminal usando o app **Expo Go** (certifique-se de que o celular e o computador estejam na mesma rede Wi-Fi).
   - **No emulador Android:** pressione `a` no terminal do Expo ou execute `npm run android`.
   - **No simulador iOS (macOS):** pressione `i` no terminal do Expo ou execute `npm run ios`.
   - **No navegador (Web):** pressione `w` no terminal do Expo ou execute `npm run web`.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor de desenvolvimento do Expo |
| `npx expo start -c` | Inicia o Expo limpando o cache do Metro Bundler |
| `npm run android` | Abre o projeto no emulador/dispositivo Android |
| `npm run ios` | Abre o projeto no simulador iOS |
| `npm run web` | Executa a versão web do aplicativo |

---

## 🔧 Solução de Problemas Comuns

- **Erro `The required package 'expo-asset' cannot be found` ou erro com `expo-font`:**
  Certifique-se de rodar `npm install` (ambos já estão declarados explicitamente no `package.json`) e reinicie o Metro com cache limpo:
  ```bash
  npx expo start -c
  ```
- **API fora do ar ou sem internet no teste:**
  O aplicativo exibirá automaticamente o catálogo local de fallback (`src/data/produtosFallback.js`) e permitirá testar normalmente a navegação, o carrinho e a finalização de pedidos.
- **Celular não conecta ao QR Code:**
  Verifique se o computador e o celular estão na mesma rede Wi-Fi ou execute em modo túnel:
  ```bash
  npx expo start --tunnel
  ```

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Quandt** — [GitHub](https://github.com/Lucas-Quandt)
