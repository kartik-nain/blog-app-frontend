const LandingPage = () => {
  return (
    <section>
    <div className="bg-gray-50 text-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-center">
              <h1 className="text-6xl text-black font-extrabold tracking-tight mb-8">
                Welcome to the Blog Platform
              </h1>
              <p className="text-xl text-black text-center mb-12">
                A platform where you can read and share stories on various
                topics.
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-lg">
            <img
              src="/src/assets/idea.jpg"
              alt="About"
              className="w-2/3 m-auto h-2/3 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default LandingPage;
