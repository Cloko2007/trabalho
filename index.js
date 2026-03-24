const express = require("express");
const app = express();

app.use(express.json());

const filmes = [
  { id: 1, titulo: "Inception", diretor: "Christopher Nolan", ano: 2010, genero: "Ficção", nota: 9 },
  { id: 2, titulo: "Titanic", diretor: "James Cameron", ano: 1997, genero: "Romance", nota: 8 },
  { id: 3, titulo: "Avatar", diretor: "James Cameron", ano: 2009, genero: "Ficção", nota: 8.5 },
  { id: 4, titulo: "Vingadores", diretor: "Joss Whedon", ano: 2012, genero: "Ação", nota: 8 },
  { id: 5, titulo: "Matrix", diretor: "Wachowski", ano: 1999, genero: "Ficção", nota: 9.5 },
  { id: 6, titulo: "Interestelar", diretor: "Christopher Nolan", ano: 2014, genero: "Ficção", nota: 9 },
  { id: 7, titulo: "Joker", diretor: "Todd Phillips", ano: 2019, genero: "Drama", nota: 8.7 },
  { id: 8, titulo: "Gladiador", diretor: "Ridley Scott", ano: 2000, genero: "Ação", nota: 8.5 },
  { id: 9, titulo: "Frozen", diretor: "Disney", ano: 2013, genero: "Animação", nota: 7.5 },
  { id: 10, titulo: "Toy Story", diretor: "Pixar", ano: 1995, genero: "Animação", nota: 8.5 }
];

// 🔹 Listar todos
app.get("/filmes", (req, res) => {
  res.json(filmes);
});

// 🔹 Buscar por ID
app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filme = filmes.find(f => f.id === id);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  res.json(filme);
});

// 🔹 Filtrar por gênero
app.get("/filmes/genero/:genero", (req, res) => {
  const genero = req.params.genero;

  const resultado = filmes.filter(f =>
    f.genero.toLowerCase() === genero.toLowerCase()
  );

  res.json(resultado);
});

// 🔹 Ordenar
app.get("/filmes/ordenar", (req, res) => {
  const campo = req.query.campo;

  let resultado = [...filmes];

  if (campo === "titulo") {
    resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (campo === "nota") {
    resultado.sort((a, b) => b.nota - a.nota);
  }

  res.json(resultado);
});

// 🔹 Paginação
app.get("/filmes/paginacao", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  const start = (page - 1) * limit;
  const end = start + limit;

  const resultado = filmes.slice(start, end);

  res.json({
    pagina: page,
    total: filmes.length,
    dados: resultado
  });
});

// ✅ ATUALIZAR FILME
app.put('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, diretor, ano, genero, nota } = req.body;

    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({
            mensagem: "Filme não encontrado"
        });
    }

    // Atualiza apenas se vier no body
    if (titulo) filme.titulo = titulo;
    if (diretor) filme.diretor = diretor;
    if (ano) filme.ano = ano;
    if (genero) filme.genero = genero;
    if (nota) filme.nota = nota;

    res.json({
        mensagem: "Filme atualizado com sucesso",
        filme
    });
});

// ✅ REMOVER FILME
app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = filmes.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Filme não encontrado"
        });
    }

    const filmeRemovido = filmes.splice(index, 1);

    res.json({
        mensagem: "Filme removido com sucesso",
        filme: filmeRemovido[0]
    });
});


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});