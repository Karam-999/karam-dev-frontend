import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className='mt-12 p-10 flex flex-col md:flex-row items-center bg-gray-900 rounded-lg shadow-md'>
      <img
        src='/data/khabib.jpg'
        alt='Khabib'
        className='rounded-full w-37 h-37 object-cover border-5 border-gray-700 shadow-md'
          />
          <div className="m-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                    About Me
              </h2>
              <p className='text-gray-300 max-w-lg'>
                I'm Karam, a passionate developer dedicated to crafting seamless web
                  experiences. </p>
              <Link to='/about' className='mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300'>
                Learn More
              </Link>
          </div>
    </section>
  );
};

export default AboutPreview;
