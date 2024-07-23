import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProblemById } from "../services/problemService";
import CodeEditor from "./CodeEditor";
import Navbar from "./Navbar";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(id);
        setProblem(data);
      } catch (error) {
        console.error("Failed to fetch problem:", error);
      }
    };

    fetchProblem();
  }, [id]);

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="w-full max-w-6xl flex flex-grow p-4 bg-white rounded shadow-lg text-gray-900">
          <div className="w-1/2 p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
            <p>{problem.description}</p>
            <p>
              <strong>Difficulty:</strong> {problem.difficulty}
            </p>
            <p>
              <strong>Tags:</strong> {problem.tags.join(", ")}
            </p>
            <p>
              <strong>Input Format:</strong> {problem.input_format}
            </p>
            <p>
              <strong>Output Format:</strong> {problem.output_format}
            </p>
            <p>
              <strong>Constraints:</strong> {problem.constraints}
            </p>
            <div>
              <h3 className="text-xl font-bold mt-4">Examples:</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>Input:</strong> {example.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {example.output}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-4">
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;
