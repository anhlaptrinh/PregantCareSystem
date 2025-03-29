export const ConvertYouTubeURL = (url) => {
  const videoId = new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}`;
};
