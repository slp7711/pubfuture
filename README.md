Este aplicativo é resultado de desafio PubFuture.

## Configuração

Para usar o aplicativo é necessário ter um servidor com banco de dados ativo e rodando.
O MYSQL foi usado com banco de dados do aplicativo.

## Configurando Banco de dados
Você vai precisar ter instalado em sem computador o banco de dados MYSQL.
Para isso, acesse o sito "https://dev.mysql.com/downloads/", escolha a opção "MYSQL Community Server"
e siga as orientações para a instlação.

Depois será necessária cadastrar um usuário com privilègios para poder manipular o banco de dados.

Use o comando para criar um novo usuário, substituindo 'novoUsuario' e 'senha' com os dados do usuário a ser criado
CREATE USER 'novoUsuario'@'localhost' IDENTIFIED BY 'senha';

Logo na sequência, atribua acessos para o usuário criado, usando o comando a seguir, substituindo 'novoUsuario' pelo nome do usuário recem criado:
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

## Como Usar o applicativo?

Primeiro será necessário copiar o aplicativo do repositório do Github no seguinte link:
https://github.com/slp7711/pubfuture.git

### .env.local

Sugerimos usar o "Visual Studio Code", mas pode ser outro editor de texto de sua preferência.

Abrir o diretório onde foram copiados os arquivos e criar um novo arquivo chamado ".env.local" no diretório principal da aplicação e editar com os seguintes parametros:

DB_HOST=localhost
DB_USER=xxxxx
DB_PASSWORD=ppppppppppp
DB_NAME=pubfuture

Substituir o 'xxxxx' em BD_USER pelo nome de usuário escolhido nas etapas anteriores. Da mesma forma para o campo DB_PASSWORD.


 Ainda no Visual Studio Code, clicar em "Terminal" e executar o comando: "npm run dev".

Pronto agora é só acessar o aplicato no endereço https://localhost:3000/ e usar o aplicativo
sem moderação. Ele é auto esplicativo, "usuário friendely".

Obs.: O nr da porta "3000" poderá ser diferente em seu sistema. Se este for o caso, só fazer a alteração.

### Por fim uma consideração

Algumas funcionalidades, melhorias no aplicativo estão em desenvolvimento e serão
implementadas em breve.

