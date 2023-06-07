import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const domain = req.headers.host;
  if (!domain) {
    res.status(400).send("400 Bad request. domain is missing");
    return;
  }
  const httpString = domain.includes('localhost') ? 'http' : 'https';
  if (req.method === "GET") {
    try {
      const url = req.query.url?.includes('https') ? decodeURI(req.query.url as string) : `${httpString}://${domain}/${decodeURI(req.query.url as string)}`;

      console.log(url)
      if (!url) {
        res.status(400).send("400 Bad request. url is missing");
        return;
      }
      
      let width = (req.query.w as string) ?? "384";
      const quality = (req.query.q as string) ?? "75";

      const response = await fetch(decodeURI(url));
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const optimized = await sharp(buffer)
        .resize({
          withoutEnlargement: true,
          width: parseInt(width),
        })
        .webp({ quality: parseInt(quality) })
        .toBuffer();

      res.setHeader(
        "Cache-Control",
        "public, max-age=31536000, must-revalidate"
      );
      res.setHeader("content-type", "image/webp");
      res.status(200).send(optimized);
    } catch (e) {
      res.status(500).end();
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
