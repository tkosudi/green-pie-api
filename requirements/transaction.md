# Transações

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/transactions**
2. ⛔ Valida dados obrigatórios **type**, **description**, **categoryId**, **amount**.
3. ⛔ Valida que **categoryId** existe na tabela **category**. Caso não exista, criar a nova categoria.
4. ⛔ **Valida** se a requisição foi feita por um **admin**
5. ✅ Retorna **204**

> ## Exceções

1. ⛔ Retorna erro **403** se o usuário não for admin
2. ⛔ Retorna erro **404** se a API não existir
3. ✅ Retorna erro **400** se type, description, categoryId e amount não forem fornecidos pelo client
4. ✅ Retorna erro **500** se der erro ao tentar gerar uma nova transação