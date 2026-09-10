const verificarJsonPost = (req, res, next) => {
  if (req.method === 'POST') {
    const contentType = req.get('Content-Type');

    // Verifica se o cabeçalho existe e se inclui 'application/json'
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        erro: 'Bad Request',
        mensagem: 'Requisições POST devem possuir o cabeçalho Content-Type: application/json.'
      });
    }
  }

  next();
};

module.exports = verificarJsonPost;
