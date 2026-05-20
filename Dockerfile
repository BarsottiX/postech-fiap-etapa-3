# define imagem base
FROM node:20

# pasta de trabalho dentro do container
WORKDIR /app

# copia arquivos do projeto para dentro do container
COPY package*.json ./

# instalacao das bibliotecas e dependencias
RUN npm install

# copia o restante dos arquivos do projeto para dentro do container
COPY . .

# informa qual porta o container vai expor
EXPOSE 3000

# comandos adicionais para rodar a aplicacao
CMD ["node", "src/index.js"]