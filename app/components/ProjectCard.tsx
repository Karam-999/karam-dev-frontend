import type { Project } from '~/types'; //importing Project type from app/types.ts
import { Link } from 'react-router';

const ProjectCard = ({ projjects }: { projjects: Project }) => {
  return (
    <Link to={`/project/${projjects.documentId}`}>
      <div className='card-lift bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm'>
        <img
          src={projjects.image}
          alt={projjects.title}
          className='w-full h-48 object-cover p-1 rounded-lg'
        />
        <div className='p-5'>
          <h2 className='text-2xl font-bold mb-2 text-white'>
            {projjects.title}
          </h2>
          <p className='text-gray-300 mb-4'>{projjects.description}</p>
          <div className='flex justify-between items-center text-gray-400'>
            <span>{projjects.category}</span>
            <span>
              {new Date(projjects.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              {/* without options The server rendered the date as 1/2/2025 but the client rendered
              it as 2/1/2025. React detected this difference and threw an error.
              Why it happened: toLocaleDateString() without options uses the
              system's locale: Server (Node.js): might use DD/MM/YYYY format
              Client (Browser): might use MM/DD/YYYY format This inconsistency
              causes React's hydration to fail because the HTML doesn't match.
              The Fix Before: After: By specifying: 'en-US' - Forces consistent
              locale
              {(year, month, day)} - Explicit format options Now both server and
              client produce the exact same output, eliminating the hydration
              mismatch! 🎯 */}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
