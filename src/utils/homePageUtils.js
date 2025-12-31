// Utility functions for the HomePage components

// Function to generate a consistent color based on text
const generateConsistentColor = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash)
    .toString(16)
    .substring(0, 6)
    .padStart(6, "0");
  return color;
};

// Function to create a fallback image for any entity
export const createFallbackImage = (name, type = "generic") => {
  // Determine background color based on entity type
  let bgColor;
  let textColor = "fff"; // White text
  let initials;

  if (type === "stock" || type === "stocks") {
    bgColor = "0047AB"; // Stock blue
    initials = name.substring(0, 2).toUpperCase();
  } else if (type === "mf" || type === "mutualFunds") {
    bgColor = "228B22"; // Fund green
    initials = name
      .split(" ")[0]
      .substring(0, 2)
      .toUpperCase();
  } else if (type === "fd" || type === "fixedDeposits") {
    bgColor = "8B008B"; // FD purple
    initials = name
      .split(" ")[0]
      .substring(0, 2)
      .toUpperCase();
  } else {
    // Generate a random but consistent color for other types
    bgColor = generateConsistentColor(name);
    initials = name.substring(0, 2).toUpperCase();
  }

  return `https://ui-avatars.com/api/?name=${initials}&background=${bgColor}&color=${textColor}&bold=true&size=150&font-size=0.33&rounded=true`;
};

export const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  ::-webkit-scrollbar:horizontal {
    width: 2px;
    height: 2px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom right, rgba(0, 0, 255, 0.9), rgba(128, 0, 128, 0.9));
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #666; 
  }

  ::-webkit-scrollbar-track {
    background-color: linear-gradient(to bottom right, rgba(0, 0, 255, 0.9), rgba(128, 0, 128, 0.9));
    border-radius: 3px;
  }
`;

// Helper function for extracting video ID (needed for error handling)
export function extractVideoId(url) {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:https?:\/\/(?:www\.)?youtu\.be\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    console.error("No match found for URL:", url);
    return null;
  }
}
