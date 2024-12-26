const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

const validateInput = () => {
  const args = process.argv.slice(2); // Pega os argumentos passados na linha de comando

  if (args.length === 0) {
    console.log("Por favor, forneça a URL do vídeo do YouTube como argumento.");
  }

  // URL do vídeo (passada via linha de comando)
  const url = args[0];

  // Verificando se o URL é válido
  if (!ytdl.validateURL(url)) {
    console.log("URL inválido!");
    return false;
  }
  // Caminho onde o vídeo será salvo
  const outputPath = path.join(__dirname, "downloads");

  // Criando diretório de download, caso não exista
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  return { url, outputPath };
};

module.exports = validateInput;