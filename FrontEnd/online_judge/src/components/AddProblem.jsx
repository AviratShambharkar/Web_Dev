import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Add Navbar component to maintain consistency
import axiosInstance from "../services/axiosInstance";

function AddProblem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState("");
  const [examples, setExamples] = useState([
    { input: "", output: "", explanation: "" },
  ]);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [difficulty, setDifficulty] = useState("easy");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const problemData = {
      title,
      description,
      input_format: inputFormat,
      output_format: outputFormat,
      constraints,
      examples,
      test_cases: testCases,
      difficulty,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await axiosInstance.post("/problems", problemData);
      navigate("/my-problems");
    } catch (error) {
      console.error("Failed to add problem:", error);
    }
  };

  const handleExampleChange = (index, field, value) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white pt-20">
        <div className="w-full max-w-4xl p-4 bg-white rounded shadow-lg text-gray-900">
          <h1 className="text-3xl font-bold mb-4">Add New Problem</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-bold">Input Format</label>
              <textarea
                value={inputFormat}
                onChange={(e) => setInputFormat(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-bold">Output Format</label>
              <textarea
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-bold">Constraints</label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-bold">Examples</label>
              {examples.map((example, index) => (
                <div key={index} className="space-y-2 border p-2 rounded">
                  <input
                    type="text"
                    value={example.input}
                    onChange={(e) =>
                      handleExampleChange(index, "input", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Input"
                  />
                  <input
                    type="text"
                    value={example.output}
                    onChange={(e) =>
                      handleExampleChange(index, "output", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Output"
                  />
                  <input
                    type="text"
                    value={example.explanation}
                    onChange={(e) =>
                      handleExampleChange(index, "explanation", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Explanation"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setExamples([
                    ...examples,
                    { input: "", output: "", explanation: "" },
                  ])
                }
                className="w-full p-2 bg-green-500 text-white rounded mt-2"
              >
                Add Example
              </button>
            </div>
            <div>
              <label className="block font-bold">Test Cases</label>
              {testCases.map((testCase, index) => (
                <div key={index} className="space-y-2 border p-2 rounded">
                  <input
                    type="text"
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(index, "input", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Input"
                  />
                  <input
                    type="text"
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseChange(index, "output", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Output"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTestCases([...testCases, { input: "", output: "" }])
                }
                className="w-full p-2 bg-green-500 text-white rounded mt-2"
              >
                Add Test Case
              </button>
            </div>
            <div>
              <label className="block font-bold">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block font-bold">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Comma separated tags"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded mt-4"
            >
              Submit Problem
            </button>
          </form>
          <p className="text-red-500 mt-4">
            Note: Make sure to add all the constraints and input method
            properly. For an array, make sure to add its size as an input
            parameter.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddProblem;
