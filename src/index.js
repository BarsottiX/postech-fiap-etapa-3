import 'dotenv/config';
import express from 'express';
import postRouter from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('API do Tech Challenge da FIAP - Etapa 2 rodando com variáveis de ambiente');
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

export default app;