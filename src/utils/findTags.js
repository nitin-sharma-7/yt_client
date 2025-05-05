// import { youtubeVideosData } from "../data/data";

function findTags(x) {
  const alltags = [];
  const tags = x.forEach((val) =>
    val.snippet.tags.forEach((tag) => alltags.push(tag))
  );
  // console.log(alltags);
  return alltags;
}

export default findTags;
