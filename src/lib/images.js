// Helper to normalize image paths coming from the DB
export function getImageSrc(imagePath) {
  if (!imagePath) return '/assets/default.jpg';
  // If already an absolute URL or starts with '/', return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) return imagePath;
  // Otherwise assume backend serves at /assets/<imagePath>
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  return `${apiBase}/assets/${imagePath}`;
}
