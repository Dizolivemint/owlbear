export default function supabaseLoader({ src, width, quality }) {
  const projectId = 'jhvfbckjvpmoahabhfth';

  if (src.startsWith('/public/')) {
    // Local image from the public directory
    const publicPath = src.replace('/public', '').replace(/\//g, '');
    return `/api/loader?url=${encodeURIComponent(publicPath)}&w=${width}&q=${quality || 100}`;
  } else if (src.startsWith('https')) {
    // Another remote image
    return `/api/loader?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 100}`;
  } else {
    // Supabase image
    return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&resize=contain&quality=${quality || 75}`;
  }
}
