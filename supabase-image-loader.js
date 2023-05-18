const projectId = 'jhvfbckjvpmoahabhfth'

export default function supabaseLoader({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&resize=contain&quality=${quality || 75}`
}