import { youtubeVideosData } from "../data/data";

function findTags() {
  const data = youtubeVideosData;
  const alltags = [];
  const tags = data.forEach((val) =>
    val.snippet.tags.forEach((tag) => alltags.push(tag))
  );
  // console.log(alltags);
  return alltags;
}

export default findTags;
