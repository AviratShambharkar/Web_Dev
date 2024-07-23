import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { runCode } from "../services/compilerService";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");

  const handleRunCode = async () => {
    try {
      const result = await runCode(language, code, input);
      setOutput(result.output);
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-2"
      >
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
      </select>
      <CodeMirror
        value={code}
        height="300px"
        options={{
          theme: "material",
          mode: language === "py" ? "python" : language,
        }}
        onChange={(value) => setCode(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Input"
        className="my-2 p-2 border rounded"
      />
      <button
        onClick={handleRunCode}
        className="p-2 bg-gray-800 text-white rounded"
      >
        Run Code
      </button>
      <textarea
        value={output}
        readOnly
        placeholder="Output"
        className="my-2 p-2 border rounded mt-2"
      />
    </div>
  );
};

export default CodeEditor;
