
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary">
      <div className="text-center">
        <img
          src="/coders-app-logo.png"
          alt="Coders App"
          className="mx-auto h-32 w-auto mb-8 opacity-50"
        />
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-8">Page not found</p>
        <a href="/" className="btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
