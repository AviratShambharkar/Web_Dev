import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputPath) => {
  return new Promise((resolve, reject) => {
    exec(`java ${filepath} < ${inputPath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

export default executeJava;
