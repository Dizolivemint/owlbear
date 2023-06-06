export default function supabaseLoader({ src, width, quality }) {
  const projectId = 'jhvfbckjvpmoahabhfth';

  if (src.startsWith('/public/')) {
    // Local image from the public directory
    const publicPath = src.replace('/public', '');
    return `${publicPath}?w=${width}&q=${quality || 75}`;
  } else if (src.startsWith('https')) {
    // Another server-side image
    return `${src}?w=${width}&q=${quality || 75}`;
  } else {
    // Supabase image
    return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&resize=contain&quality=${quality || 75}`;
  }
}
