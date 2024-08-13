#!/bin/sh

node ./syncDb.js

if [ $? -eq 0 ]; then
  node ./src/helpers/populateDb.js
else
  echo "Erro ao sincronizar as tabelas. População do banco de dados não executada."
  exit 1
fi

npm run dev
