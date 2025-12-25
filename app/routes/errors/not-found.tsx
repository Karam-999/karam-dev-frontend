import { Link } from 'react-router';


const NotFound = () => {
    return ( 
        <div className="flex flex-col items-center justify-center text-center px-6 min-h-[80vh]">
            <h1 className="text-6xl font-extrabold text-blue-400 mb-2">
                404
            </h1>
            <p className='text-2xl font-semibold text-gray-100 mb-2'>
                Page Not Found  
            </p>
            <p className='text-gray-400'>
                Oops! The page you are looking for does not exist.
            </p>
            <Link to='/' className='mb-8 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-6 rounded-lg'>← Back to Home</Link>
</div>

     );
}
 
export default NotFound;