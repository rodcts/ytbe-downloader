const ytdl = require("@distube/ytdl-core");
const path = require("path");
const downloadVideo = require("./downloadVideo.js");

const checkData = async (url, outputPath) => {
  try {
    console.log("Iniciando o download...", url);

    // Obtendo informações sobre o vídeo para montar o processo
    const info = await ytdl.getBasicInfo(url);
    const title = info.videoDetails.title.replace(/[\/:*?"<>|]/g, "");
    const filePath = path.join(outputPath, `${title}.mp4`);

    // Faz o download e grava o video
    return await downloadVideo(url, filePath);

  } catch (error) {
    console.error("Erro ao obter informações do vídeo:", error);
    return false;
  }
};

module.exports = checkData;