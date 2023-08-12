# Projeto Invext

## Requisitos funcionais
- O projeto deve ser disponibilizado em forma de API REST, caso necessário
- O cliente poderá fazer uma requisição à um departamento, informando o departamento desejado, o assunto e demais informações
- A requisição deverá ser distribuída entre os atendentes

## Regras de negócio
- Cada atendente poderá atender somente 3 clientes simultaneamente

## Requisitos não funcionais
- Yarn
- Docker/Docker compose
- NodeJS
- TypeScript
- Prettier
- ESLint
- Testes unitários
- [AMQPLIB](https://amqp-node.github.io/amqplib/channel_api.html)

## Subindo o serviço RabbitMQ
```$ docker compose up -d```<br><br>
Após isso, a API AMQP do RabbitMQ estará disponível no localhost na porta 3000, e o painel de admin na porta 13000 com o usuário admin e a senha admin (todos os dados de porta e credenciais podem ser alterados no arquivo ```docker-compose.yml```

## Testes
```$ yarn test```

## Linting
```$ yarn lint```

## Formatação de código
```$ yarn format```

## Lógica
- Cada atendente possui sua fila individual, com no máximo 3 mensagens por fila, que podem ser consumidas se conectando à API do RabbitMQ e utilizando o método do amqplib passando a fila do atendente como parâmetro
- Cada fila possui um padrão de nomenclatura para facilitar a busca: ```"departamento.atendant.<nome_do_atendente>"```
- Ao realizar uma requisição, será buscado todas as filas do departamento solicitado, onde serão filtradas pela menor quantidade de mensagens, a requisição será enviada à fila que contenha a menor quantidade
- Cada mensagem consumida da fila, não será excluída da fila por padrão, essa configuração pode ser editada no arquivo ```create-atendant.ts```, adicionando ```autoDelete: true``` como segundo argumento da função ```assertQueue```
- Esse projeto foi idealizado para funcionar como uma biblioteca, portanto, poderá ser utilizado para a criação de REST APIs separadamente
- Para ser utilizado como biblioteca, o projeto que a está utilizando o invext-core, deverá possuir um arquivo ```.env``` na raíz do projeto
