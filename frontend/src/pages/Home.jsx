const Home = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative"
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/coders-app-logo.png"
            alt="Coders App"
            className="max-w-md w-full h-auto opacity-90"
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() =>
              document
                .getElementById("content")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center justify-center w-12 h-12 text-teal-400 text-3xl animate-bounce cursor-pointer hover:text-lime-400 transition-colors duration-300 focus:outline-none bg-gray-800/50 rounded-full border border-teal-400/30 hover:border-lime-400/50"
            aria-label="Scroll to content"
          >
            ↓
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section id="content" className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-4 text-accent">
              Learn & Practice
            </h3>
            <p className="text-gray-300">
              Master programming with interactive challenges and real-world
              projects.
            </p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-4 text-accent">
              Compete & Grow
            </h3>
            <p className="text-gray-300">
              Join coding competitions and climb the leaderboard with fellow
              developers.
            </p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-4 text-accent">
              Build Portfolio
            </h3>
            <p className="text-gray-300">
              Showcase your skills and projects to potential employers and
              collaborators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
