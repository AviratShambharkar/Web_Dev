import Navbar from "./Navbar";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to HackathonHub!</h1>
          <p className="mt-4 text-lg">You have successfully logged in.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
