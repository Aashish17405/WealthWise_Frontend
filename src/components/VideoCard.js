import React from "react";

// Helper function for extracting video ID (needed for error handling)
function extractVideoId(url) {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:https?:\/\/(?:www\.)?youtu\.be\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    console.error("No match found for URL:", url);
    return null;
  }
}

const VideoCard = ({ video, index }) => {
  const bgIntensity = Math.max(700 - index * 50, 800);

  return (
    <div
      key={video.id}
      className={`flex-shrink-0 w-64 bg-gradient-to-br from-blue-900/90 to-purple-900/90-${bgIntensity} rounded-lg p-4 
      transform transition-all duration-300 
      hover:scale-105 hover:shadow-lg
      scroll-snap-align: start;`}
    >
      <div className="relative mb-3">
        <img
          src={video.thumbnail}
          alt={video.name}
          onClick={() => window.open(video.videoUrl, "_blank")}
          className="w-full h-40 object-cover rounded-md cursor-pointer"
          onError={(e) => {
            // If thumbnail fails, use YouTube's default thumbnail format
            const videoId = extractVideoId(video.videoUrl);
            if (videoId) {
              e.target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
            }
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 rounded">
          {video.duration}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg line-clamp-2">{video.name}</h4>
        <p className="text-sm text-gray-300">{video.views}</p>
      </div>
    </div>
  );
};

export default VideoCard;
