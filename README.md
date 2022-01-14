Este aplicativo é resultado de desafio PubFuture.

## Configuração

Para usar o aplicativo é necessário ter um servidor com banco de dados ativo e rodando.
O MYSQL foi usado com banco de dados do aplicativo.

## Configurando Banco de dados
Você vai precisar ter instalado em sem computador o banco de dados MYSQL.
Para isso, acesse o sito "https://dev.mysql.com/downloads/", escolha a opção "MYSQL Community Server"
e siga as orientações para a instlação.

Depois será necessária cadastrar um usuário com privilègios para poder manipular o banco de dados.

Use o comando para criar um novo usuário, substituindo 'novoUsuario' e 'senha' com os dados do
usuário a ser criado
CREATE USER 'novoUsuario'@'localhost' IDENTIFIED BY 'senha';

Logo na sequência, atribua acessos para o usuário criado, usando o comando a seguir,
substituindo 'novoUsuario' pelo nome do usuário recem criado:
GRANT ALL PRIVILEGES ON * . * TO 'novoUsuario'@'localhost';

Para que os acessos sejam reconhecidos pelo MYSQL, execute o seguinte comando:
FLUSH PRIVILEGES;

Crie um banco de dados com o seguinte comando:
CREATE DATABASE pubfuture;

Para poder usar o banco de dados criado execute o seguinte comando:
USE pubfuture;

Vamos precisar criar 3 tabelas para nosso banco de dados. Copie e execute os seguintes comando no seus MYSQL:

CREATE TABLE `pubfuture`.`receitas` (
  `idReceitas` INT NOT NULL AUTO_INCREMENT,
  `tipoReceita` VARCHAR(100) NOT NULL,
  `idConta` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `dataRecebimentoEsperado` DATE NOT NULL,
  `dataRecebimento` DATE NOT NULL COMMENT '	',
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idReceitas`));


  CREATE TABLE `pubfuture`.`despesas` (
  `idDespesas` INT NOT NULL AUTO_INCREMENT,
  `tipoDespesa` VARCHAR(100) NOT NULL,
  `idConta` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `dataPagamentoEsperado` DATE NOT NULL,
  `dataPagamento` DATE NOT NULL COMMENT '	',
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idDespesas`));


  CREATE TABLE `pubfuture`.`contas` (
  `idContas` INT NOT NULL AUTO_INCREMENT,
  `tipoConta` VARCHAR(100) NOT NULL,
  `instituicaoFinanceira` VARCHAR(100) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idContas`));

Agora estamos prontos para usar o aplicativo.

## Como Usar o applicati?

Primeiro será necessário copiar o aplicativo do repositório do Github no seguinte link:
https://github.com/slp7711/pubfuture.git

Depois, abrir o diretório onde foram copiados os arquivos e abrir com o Visual Studio Code,
clicar em "Terminal" e executar o comando: npm run dev.

Pronto agora é só acessar o aplicato no endereço https://localhost:3000/ e usar o aplicativo
sem moderação. Ele é auto esplicativo, "usuário friendely".

### Por fim uma consideração

Algumas funcionalidades, melhorias no aplicativo estão em desenvolvimento e serão
implementadas em breve.







First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
