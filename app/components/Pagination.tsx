type PaginationPropss = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page:number) => void;
}


const Pagination: React.FC<PaginationPropss> = ({ currentPage, totalPages, setCurrentPage }) => {

    if (totalPages <= 1) return null;

    return (
      <div className='flex justify-end gap-3 mt-5 text-sm'>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={`px-3 py-2 cursor-pointer rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </button>
        ))}
      </div>
    );
}
 
export default Pagination;