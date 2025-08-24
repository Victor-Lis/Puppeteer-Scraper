# Puppeteer Google News Scraper

Este projeto é um web scraper desenvolvido em Node.js que utiliza a biblioteca Puppeteer para buscar notícias no Google com base em um termo de pesquisa fornecido e armazena os resultados em um banco de dados MongoDB.

## Funcionalidades

- Busca notícias no Google com base em um termo de pesquisa.
- Salva o título, o link e a data do scraping em uma coleção no MongoDB.
- Utiliza Docker e Docker Compose para uma configuração fácil e rápida do ambiente de banco de dados.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (ou outro gerenciador de pacotes)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Instalação

1.  Clone o repositório (ou use os arquivos locais).
2.  Instale as dependências do projeto:
    ```sh
    pnpm install
    ```

## Como Usar

### 1. Iniciar o Banco de Dados com Docker

O projeto utiliza Docker para gerenciar o banco de dados MongoDB e o Mongo Express (uma interface de administração web para o MongoDB). Para iniciar os contêineres, execute o seguinte comando definido no [package.json](package.json):

```sh
pnpm run docker
```

Isso irá baixar as imagens e iniciar os serviços definidos no arquivo [docker-compose.yml](docker-compose.yml).

- **MongoDB** estará acessível em `localhost:27017`.
- **Mongo Express** estará acessível em `http://localhost:8081`.
  - **Usuário:** `mongoexpressuser`
  - **Senha:** `mongoexpresspass`

### 2. Executar o Scraper

Para iniciar o processo de scraping, execute o script `scrap` e passe o termo de pesquisa desejado como um argumento entre aspas.

```sh
pnpm run scrap "inteligência artificial"
```

O script, definido em [scraper.js](scraper.js), irá navegar até o Google, realizar a busca e salvar os resultados no banco de dados `scrap_db` na coleção `search_results`.

## Estrutura do Projeto

- [`scraper.js`](scraper.js): O script principal que orquestra a execução, recebe os argumentos da linha de comando e interage com os módulos de scraping e banco de dados.
- [`services/scrap.js`](services/scrap.js): Contém a classe `Scraper` com a lógica de scraping usando Puppeteer.
- [`services/db.js`](services/db.js): Contém a classe `Database` responsável pela conexão e manipulação do banco de dados MongoDB.
- [`docker-compose.yml`](docker-compose.yml): Define os serviços `mongo` e `mongo-express` para o ambiente de desenvolvimento.
- [`package.json`](package.json): Define as dependências e os scripts do projeto.

## Autor
- [Victor Lis Bronzo](https://www.linkedin.com/in/victor-lis-bronzo)
