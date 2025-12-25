import type { Route } from './+types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Karam-is-a-dev | About Me' },
    { name: 'description', content: 'Welcome to Karam-is-a-dev!' },
  ];
}

const AboutPage = () => {
  return (
    <div className='max-w-5xl mx-auto px-6 py-16 bg-gray-900'>
      <div className='flex flex-col md:flex-row md:items-start items-center gap-10 px-6 mb-12'>
        <img
          src='/data/khabib.jpg'
          alt='Khabib'
          className='rounded-full w-40 h-40 object-cover border-5 border-gray-700 shadow-md'
        />
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Hey There! I'm Karam 🙋‍♂️
          </h1>
          <p className='text-gray-300 text-lg'>
            I'm Karam, a passionate developer dedicated to crafting seamless web
            experiences. I thrive on turning ideas into reality through clean
            and efficient code. In my free time I explore Neuroscience,
            cybersecurity, and enjoy watching MMA (Khabib is my favorite).
            <br />
            Feel free to reach out, I'd love to collaborate on your next project
            if I can!
          </p>
        </div>
      </div>

      <div className='mb-12 px-6'>
        <h2 className='text-2xl font-semibold text-white mb-4'>My Mission</h2>
        <p className='text-gray-300 leading-relaxed'>
          I wanna learn Neuroscience and AI to build intelligent systems that
          can understand and interact with humans in a more natural way. I'm
          particularly interested in Brain Computer Interfaces (BCI) and how
          they can revolutionize human-computer interaction.
        </p>
      </div>
      {/* tech stack */}
      <h2 className='text-2xl px-6 font-semibold text-white mb-4'>
        Tech Stack & Tools
      </h2>
      <ul className='flex px-6 flex-wrap gap-4 text-sm text-gray-300'>
        {[
          'React.js',
          'TypeScript',
          'Node.js',
          'React Router v7',
          'Strapi CMS',
          'NeonDB',
          'Vercel',
          'Tanstack Query',
          'Tanstack Router',
          'Formspree',
          'Render',
          'Tailwind CSS',
          'VS Code',
          'Git',
          'GitHub',
        ].map((tech) => (
          <li
            key={tech}
            className='bg-gray-800 px-4 py-2 rounded-lg border border-gray-700'>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
