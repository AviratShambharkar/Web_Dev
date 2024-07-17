import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getAllProblems } from "../services/problemService";

function HomePage() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getAllProblems();
        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to HackathonHub!</h1>
          <p className="mt-4 text-lg">You have successfully logged in.</p>
        </div>
        <div className="w-full max-w-4xl p-4 bg-white rounded shadow-lg text-gray-900">
          <h2 className="text-2xl font-bold mb-4">All Problems</h2>
          {problems.length === 0 ? (
            <div>No problems available.</div>
          ) : (
            <div className="space-y-4">
              {problems.map((problem) => (
                <div key={problem._id} className="p-4 border rounded">
                  <h3 className="text-xl font-bold">{problem.title}</h3>
                  <p>{problem.description}</p>
                  <p>
                    <strong>Difficulty:</strong> {problem.difficulty}
                  </p>
                  <p>
                    <strong>Tags:</strong> {problem.tags.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
