const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;

    next();
  } catch (ex) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

const gerarToken = (payload) => {
  try {
    const expiresIn = process.env.JWT_EXPIRES;

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (ex) {
    throw new Error("Erro ao gerar o token");
  }
};

const cifrarSenha = (senha) => {
  const salto = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(senha, salto);

  return hash;
};

const compararSenha = (senha, hash) => {
  return bcrypt.compareSync(senha, hash);
};

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha,
};
