import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProblemById, updateProblem } from "../services/problemService";

function UpdateProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    input_format: "",
    output_format: "",
    constraints: "",
    examples: [],
    test_cases: [],
    difficulty: "",
    tags: [],
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProblem(id, problem);
      navigate("/my-problems");
    } catch (error) {
      console.error("Failed to update problem:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-4">Update Problem</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={problem.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Description</label>
          <textarea
            name="description"
            value={problem.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Input Format</label>
          <textarea
            name="input_format"
            value={problem.input_format}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Output Format</label>
          <textarea
            name="output_format"
            value={problem.output_format}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Constraints</label>
          <textarea
            name="constraints"
            value={problem.constraints}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold">Difficulty</label>
          <select
            name="difficulty"
            value={problem.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block font-bold">Tags</label>
          <input
            type="text"
            name="tags"
            value={problem.tags.join(", ")}
            onChange={(e) =>
              setProblem((prevProblem) => ({
                ...prevProblem,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              }))
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Update Problem
        </button>
      </form>
    </div>
  );
}

export default UpdateProblem;
