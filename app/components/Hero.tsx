import { Link } from 'react-router';

const Hero = () => {
  return (
    //transition color will help in dark mode implementation so when we switch to dark mode it will animate the color change
    <header className='text-center py-20 text-white px-4 bg-gray-900 rounded transition-colors duration-300'>
      <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-3'>
        Hey! I am Karam 👋
      </h1>
      <p className='text-lg text-gray-300  max-w-2xl mx-auto font-semibold rounded-lg px-4 py-2'>
        A passionate developer dedicated to crafting seamless web experiences.
      </p>
      <div className='flex justify-center gap-6'>
        <Link
          to='/project'
          className='bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer'>
          View Projects
        </Link>
        <Link
          to='/contact'
          className='border border-blue-600 text-blue-600 px-6 py-2 rounded-lg mt-4 font-semibold hover:bg-blue-600 hover:!text-white transition-colors duration-300 cursor-pointer'>
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
