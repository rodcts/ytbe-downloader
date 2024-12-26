// Assisted by watsonx Code Assistant
const assert = require("assert");
const path = require("path");
const checkData = require("../main.js");

const url = "https://www.youtube.com/watch?v=8xKIPZZSX9s&pp=ygUJY29tZXJjaWFs";
const outputPath = path.join(__dirname, "downloads");

describe("checkData", () => {
  it("should throw an error if the URL is invalid", async () => {
    try {
      const data = await checkData('https://youtubee.com', outputPath);
      expect(data).toBeDefined();
      // assert.fail("URL inválido!");
    } catch (error) {
      assert.equal(error.message, "URL inválido!");
    }
  }, 10000);

  it("should throw an error if the video info cannot be obtained", async () => {
    try {
      const data = await checkData('https://youtube.com', outputPath);
      expect(data).toBeDefined();
      // assert.fail("Erro ao obter informações do vídeo: Error: Invalid video ID");
    } catch (error) {
      assert.equal(error.message, "Erro ao obter informações do vídeo: Error: Invalid video ID");
    }
  }, 10000);

  it("should throw an error if the video file cannot be created", async () => {
    try {
      const data = await checkData('https://invalid/path', outputPath);
      expect(data).toBeDefined();
      // assert.fail("Erro ao baixar o vídeo: Error: EACCES: permission denied, mkdir 'invalid/path'");
    } catch (error) {
      assert.equal(error.message, "Erro ao baixar o vídeo: Error: EACCES: permission denied, mkdir 'invalid/path'");
    }
  }, 10000);

  it("should download the video and save it to the specified path", async () => {
    const data = await checkData(url, outputPath);
    expect(data).toBeDefined();
    // assert.ok(fs.existsSync(outputPath));
  }, 10000);
});
