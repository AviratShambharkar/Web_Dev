import express from "express";
import cors from "cors";
import generateFile from "./generateFile.js";
import executeCpp from "./executeCpp.js";
import executePy from "./executePy.js";
import executeC from "./executeC.js";
import executeJava from "./executeJava.js";
import generateInputFile from "./generateInputFile.js";

const app = express();
const port = 5000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputPath = input ? await generateInputFile(input) : null;

    let output;
    switch (language) {
      case "c":
        output = await executeC(filePath, inputPath);
        break;
      case "py":
        output = await executePy(filePath, inputPath);
        break;
      case "cpp":
        output = await executeCpp(filePath, inputPath);
        break;
      case "java":
        output = await executeJava(filePath, inputPath);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Invalid language!" });
    }

    res.json({ filePath, inputPath, output });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
