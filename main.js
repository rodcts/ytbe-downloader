const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

// Função para baixar o vídeo
const checkData = async (url, outputPath) => {
  try {
    console.log("Iniciando o download...", url);

    // Obtendo informações sobre o vídeo
    const info = await ytdl.getBasicInfo(url);
    const title = info.videoDetails.title.replace(/[\/:*?"<>|]/g, "");
    const filePath = path.join(outputPath, `${title}.mp4`);

    // Faz o download e grava o video
    const responseCheckData = await downloadVideo(url, filePath);

    if (!responseCheckData) {
      // Rejeitar a Promise em caso de erro
      responseCheckData.videoStream.on("error", (error) => {
        console.error("Erro ao baixar o vídeo:", error);
        return false;
      });

      responseCheckData.fileStream.on("error", (error) => {
        console.error("Erro ao escrever o arquivo:", error);
        return false;
      });
    }
  } catch (error) {
    console.error("Erro ao obter informações do vídeo:", error);
    return false;
  }
};

const downloadVideo = async (url, filePath) => {
  try {
    // Baixando o vídeo
    const videoStream = ytdl(url, { quality: "highest" });
    const fileStream = fs.createWriteStream(filePath);

    // Aguardar o término do download ou erro usando uma Promise
    await videoStream
      .pipe(fileStream)
      .then(() => {
        return { videoStream, fileStream, filePath };
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

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

// Chama a função para validaçao
const validateData = validateInput();
// Chama a função para baixar o vídeo
validateData ? checkData(validateData.url, validateData.outputPath) : "Error";

module.exports = checkData;
