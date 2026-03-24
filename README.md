# O trabalho esta na branch master, favor alterar a branch

metodo get
app.get("/filmes", (req, res) => {
  res.json(filmes);
});

metodo put
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

metodo delete
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

metodo post
// ✅ ADICIONAR NOVO FILME
app.post('/filmes', (req, res) => {
    const { titulo, diretor, ano, genero, nota } = req.body;

    // 🔴 Validação
    if (!titulo || !diretor || !ano || !genero || nota === undefined) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    // 🔢 Gerar ID automático
    const novoId = filmes.length > 0 
        ? Math.max(...filmes.map(f => f.id)) + 1 
        : 1;

    // 🔴 Validação da nota (0 a 10)
    if (nota < 0 || nota > 10) {
        return res.status(400).json({
            mensagem: "A nota deve ser entre 0 e 10"
        });
    }

    const novoFilme = {
        id: novoId,
        titulo,
        diretor,
        ano,
        genero,
        nota
    };

    filmes.push(novoFilme);

    res.status(201).json({
        mensagem: "Filme criado com sucesso",
        filme: novoFilme
    });
});
