import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProblems, deleteProblem } from "../services/problemService";

function MyProblems() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProblems = async () => {
      try {
        const data = await getUserProblems();
        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch user problems:", error);
      }
    };

    fetchUserProblems();
  }, []);

  const handleDelete = async (problemId) => {
    try {
      await deleteProblem(problemId);
      setProblems(problems.filter((problem) => problem._id !== problemId));
    } catch (error) {
      console.error("Failed to delete problem:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-4">My Problems</h1>
      <div className="space-y-4">
        {problems.length === 0 ? (
          <div>No problems posted by you.</div>
        ) : (
          problems.map((problem) => (
            <div
              key={problem._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">{problem.title}</h2>
                <p>{problem.description}</p>
                <p>
                  <strong>Difficulty:</strong> {problem.difficulty}
                </p>
                <p>
                  <strong>Tags:</strong> {problem.tags.join(", ")}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/my-problems/${problem._id}/update`)}
                  className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(problem._id)}
                  className="ml-4 p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyProblems;
