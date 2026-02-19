# AUTM02 – Automação E2E com Playwright (React Shopping Cart)

Projeto de automação de testes End-to-End (E2E) utilizando **Playwright + TypeScript**, aplicando o padrão **Page Object Model (POM)** com separação explícita de locatários, focado no fluxo de seleção de produtos, filtros e validação matemática de carrinho.

**URL testada:** https://react-shopping-cart-67954.firebaseapp.com/

---

## 1. Objetivo do Projeto

Validar a integridade do fluxo de compra e a precisão dos cálculos do carrinho de compras, garantindo:
* **Filtros funcionais:** Seleção de tamanhos (XXL).
* **Consistência de Quantidade:** Validação se o contador do carrinho reflete a soma real dos itens.
* **Integridade Financeira:** Verificação se o preço total é a soma exata de `preço * quantidade` de cada item.
* **Fluxo de Checkout:** Garantir que a ação de finalização de compra está disponível.

## 2. Tecnologias Utilizadas

* **Playwright:** Framework de automação para testes de ponta a ponta.
* **TypeScript:** Linguagem para garantir tipagem forte e reduzir erros de lógica nos testes.
* **Page Object Model (POM):** Arquitetura para separar seletores, métodos de ação e o script de teste.

## 3. Diferencial da Arquitetura: Locators Detached

Diferente de modelos POM simples, este projeto utiliza uma classe separada para **Locators** (`HomePageLocators.ts`). Isso permite:
* **Centralização de Seletores:** Alterações no DOM do site são corrigidas em um único arquivo.
* **Abstração de XPath/CSS:** O teste não conhece a estrutura do HTML, apenas as ações de negócio.

## 4. Estrutura de Arquivos

AUTM02/
├── pages/
│   ├── HomePage.ts          # Métodos de ação e lógica de validação
│   └── locators.ts          # Seletores de elementos (Locators)
├── tests/
│   └── checkout.spec.ts     # Script de teste principal
├── playwright.config.ts
└── package.json

## 5. Cenários Automatizados 

**TC01 – Fluxo Completo de Compra e Validação de Preço**
Given que o usuário acessa a loja de camisetas
When aplica o filtro de tamanho "XXL"
And adiciona uma camiseta "Slim Black" e três camisetas "Cropped Groovy" ao carrinho
Then o sistema deve somar corretamente as quantidades no ícone do carrinho
And o valor total exibido deve ser a soma precisa dos preços individuais multiplicados pelas suas quantidades
And o usuário deve conseguir prosseguir para o Checkout.

## 6. Como Executar

Instale as dependências:
Bash
npm install
Execute os testes:

Bash
npx playwright test
Exibir relatório:

Bash
npx playwright show-report