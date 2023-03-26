const SelectedItems = (props) => {
  const calculateSize = (totalBytes) => {
    if (totalBytes < 1000000) {
      return Math.floor(totalBytes / 1000) + " KB";
    } else {
      return Math.floor(totalBytes / 1000000) + " MB";
    }
  };
  const singleItem = (file, index) => {
    return (
      <div className='flex items-center border border-dashed border-gray-300 drop-shadow-sm rounded-md p-2 mx-4'>
        <img
          src={
            "https://res.cloudinary.com/dou11jh0x/image/upload/v1679791174/assets/b18ee78cc15841e086d737019792eebf_hmhva3.jpg"
          }
          className='w-6 h-6 rounded-full  m-2 drop-shadow-sm'
          alt='img'
        />
        <div className='flex justify-center items-center mx-auto'>
          <span className='text-base text-gray-800 font-semibold '>
            {file.name}
          </span>
          <span className='text-base text-gray-800 font-semibold ml-2'>
            (Size: {calculateSize(file.size)})
          </span>
        </div>
        <button
          onClick={() => props.handleRemove(index)}
          className='ml-auto py-1.5 px-2 rounded-md bg-red-300 text-white font-semibold text-sm'>
          Remove
        </button>
      </div>
    );
  };
  return (
    <div className=' border border-gray-200 rounded-md p-2 mt-4'>
      <h2 className='text-2xl font-semibold text-gray-700 my-2 text-left ml-4 '>
        Selected Items
      </h2>
      {props.items.map((item, i) => {
        return (
          <div key={i}>
            {singleItem(item, i)}
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default SelectedItems;
