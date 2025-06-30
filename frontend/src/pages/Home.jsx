

const Home = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/coders-app-logo.png"
            alt="Coders App"
            className="max-w-md w-full h-auto opacity-90"
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 text-teal-400 text-2xl">↓</div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-4 text-accent">Learn & Practice</h3>
            <p className="text-gray-300">
              Master programming with interactive challenges and real-world projects.
            </p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-4 text-accent">Compete & Grow</h3>
            <p className="text-gray-300">
              Join coding competitions and climb the leaderboard with fellow developers.
            </p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-4 text-accent">Build Portfolio</h3>
            <p className="text-gray-300">
              Showcase your skills and projects to potential employers and collaborators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;