import { useState, useEffect } from "react";
import { getUserProblems } from "../services/problemService";

function MyProblems() {
  const [problems, setProblems] = useState([]);

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

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-4">My Problems</h1>
      <div className="space-y-4">
        {problems.length === 0 ? (
          <div>No problems posted by you.</div>
        ) : (
          problems.map((problem) => (
            <div key={problem._id} className="p-4 border rounded">
              <h2 className="text-2xl font-bold">{problem.title}</h2>
              <p>{problem.description}</p>
              <p>
                <strong>Difficulty:</strong> {problem.difficulty}
              </p>
              <p>
                <strong>Tags:</strong> {problem.tags.join(", ")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyProblems;
