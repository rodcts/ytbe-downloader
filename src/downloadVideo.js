const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

const downloadVideo = async (url, filePath) => {
  try {
    // Baixa o vídeo na maior qualidade disponivel
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

module.exports = downloadVideo;
