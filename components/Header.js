export default function Header() {
  return (
    <div className="md:h-screen md:flex px-4 md:px-0 overflow-x-hidden container md:w-2/3  mx-auto">
      <div className="md:w-1/2 pt-32 text-gray-900 ">
    <div className="bg-gray-200 rounded-3xl h-8 w-96"></div>
 
        <h1 className="font-medium text-7xl pt-8">Materials</h1>
        <p className='py-8 text-2xl pr-20'>
        
         What we <span className="font-bold text-black">provide</span> 
        </p>
        <button className="font-medium text-white bg-black px-6 py-2 rounded-3xl">Plant Hire &gt;	 </button>
      </div>
      <div className='pt-32 md:pl-32 pb-4'>
          <img src='/heavy_box.svg'></img>
      </div>
    </div>
  );
}
