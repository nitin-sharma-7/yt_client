const Shimmer = ({
  width = "w-full",
  height = "h-8",
  rounded = "rounded-md",
  className = "",
  count = 1,
}) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`${width} ${height} ${rounded} ${className} relative overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2`}
        >
          <div className="shimmer-effect absolute inset-0 -translate-x-full" />
        </div>
      ))}
    </>
  );
};

export const VideoCardShimmer = () => (
  <div className="flex flex-col">
    <Shimmer height="h-40" rounded="rounded-lg" />
    <Shimmer height="h-6" width="w-full" className="mt-2" />
    <Shimmer height="h-4" width="w-2/3" className="mt-2" />
    <Shimmer height="h-4" width="w-1/3" className="mt-1" />
  </div>
);

export default Shimmer;
