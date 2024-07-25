import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { runCode } from "../services/compilerService";
import { getProblemById } from "../services/problemService";

const codeTemplates = {
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
`,
  py: `print('Hello, world!')`,
  c: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`,
  java: `import java.util.Scanner;

class Test
{
    public static void main(String []args)
    {
        System.out.println("My First Java Program.");
    }
}`,
};

const CodeEditor = () => {
  const [code, setCode] = useState(codeTemplates.cpp);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [testCases, setTestCases] = useState([]);
  //const [testCaseIndex, setTestCaseIndex] = useState(0);
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    setCode(codeTemplates[language]);
  }, [language]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(id);
        console.log("Fetched problem test cases:", data.test_cases); // Log test cases here
        setProblem(data);
        setTestCases(data.test_cases || []);
      } catch (error) {
        console.error("Failed to fetch problem:", error);
      }
    };

    fetchProblem();
  }, [id]);

  if (!problem) {
    return <div>Loading...</div>;
  }

  const handleRunCode = async () => {
    if (testCases.length > 0) {
      const results = [];
      for (let i = 0; i < testCases.length; i++) {
        const selectedTestCase = testCases[i];
        try {
          const result = await runCode(language, code, selectedTestCase.input);
          const isPassed =
            result.output.trim() === selectedTestCase.output.trim();
          results.push({
            input: selectedTestCase.input,
            expected: selectedTestCase.output,
            output: result.output,
            passed: isPassed,
          });
        } catch (error) {
          results.push({
            input: selectedTestCase.input,
            expected: selectedTestCase.output,
            output:
              "Error executing code: " + (error.message || "Unknown error"),
            passed: false,
          });
        }
      }
      setTestResults(results);
      setOutput(
        results
          .map(
            (res, idx) =>
              `Test Case ${idx + 1}:\n${
                res.passed ? "Passed" : "Failed"
              }\nExpected: ${res.expected}\nOutput: ${res.output}`
          )
          .join("\n\n")
      );
    } else {
      setOutput("No test cases available");
    }
  };

  const languageMode = () => {
    switch (language) {
      case "cpp":
      case "c":
        return cpp();
      case "py":
        return python();
      case "java":
        return java();
      default:
        return cpp();
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
        extensions={[languageMode()]}
        onChange={(value) => setCode(value)}
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
      {testResults.length > 0 && (
        <div className="mt-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-2 rounded mb-2 ${
                result.passed ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <p>Test Case {index + 1}:</p>
              <p>Input: {result.input}</p>
              <p>Expected Output: {result.expected}</p>
              <p>Actual Output: {result.output}</p>
              <p>{result.passed ? "Passed" : "Failed"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
