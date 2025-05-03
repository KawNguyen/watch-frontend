interface VideoPlayerProps {
  videoUrl?: string;
}

export const ProductTrailer = ({ videoUrl }: VideoPlayerProps) => {
  const getYouTubeVideoId = (url?: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="aspect-w-16 aspect-h-9 w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-[400px] rounded-lg"
      />
    </div>
  );
};
