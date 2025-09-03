// "Banco" em memória (mock)
let metas = [];
let idCounter = 1;

// Criar nova meta
export const criarMeta = (req, res) => {
  const novaMeta = { id: idCounter++, ...req.body };
  metas.push(novaMeta);
  res.status(201).json(novaMeta);
};

// Listar todas as metas
export const listarMetas = (req, res) => {
  res.json(metas);
};

// Atualizar meta por ID
export const atualizarMeta = (req, res) => {
  const id = parseInt(req.params.id);
  const index = metas.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Meta não encontrada" });
  }

  metas[index] = { ...metas[index], ...req.body };
  res.json(metas[index]);
};

// Deletar meta
export const deletarMeta = (req, res) => {
  const id = parseInt(req.params.id);
  metas = metas.filter((m) => m.id !== id);
  res.json({ message: "Meta removida" });
};
