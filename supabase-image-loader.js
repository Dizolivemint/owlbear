export default function supabaseLoader({ src, width, quality }) {
  const projectId = 'jhvfbckjvpmoahabhfth';

  if (src.startsWith('/public/')) {
    // Local image from the public directory
    const publicPath = src.replace('/public', '');
    return publicPath;
  } else {
    // Supabase image
    return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&resize=contain&quality=${quality || 75}`;
  }
}
