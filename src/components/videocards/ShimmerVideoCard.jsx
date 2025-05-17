const ShimmerVideoCard = () => {
  return (
    <div className=" sm:w-[480px] w-72 mb-6 md:w-80 animate-pulse">
      <div className="w-full h-52 bg-gray-300 rounded-lg mb-2" />

      <div className="flex gap-2 mt-2">
        <div className="w-9 h-9 bg-gray-300 rounded-full mt-1" />

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div className="w-3/4 h-4 bg-gray-300 rounded" />
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          </div>
          <div className="w-1/2 h-3 bg-gray-300 rounded mb-1" />
          <div className="w-2/3 h-3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerVideoCard;
