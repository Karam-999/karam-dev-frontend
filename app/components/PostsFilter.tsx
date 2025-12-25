type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div className='mb-6'>
      <input
        type='text'
        className='px-4 w-full py-2 bg-gray-800 rounded border border-gray-700 text-gray-100 focus:outline-none focus-ring focus:ring-blue-500'
        placeholder='Search Posts...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default PostFilter;
