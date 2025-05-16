import { VideoCardShimmer } from "./Shimmer";

function MainShimmer() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
          <VideoCardShimmer />
        </div>
      </div>
    </div>
  );
}

export default MainShimmer;
