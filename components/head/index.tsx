import Head from 'next/head';

type HeadContentProps = {
  title: string;
  description: string;
};

const HeadContent: React.FC<HeadContentProps> = (props) => {
  return (
    <Head>
      <title>{`Owlbear Online | ${props.title}`}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="AI Monster Generator" />
      <meta
        property="og:description"
        content="DnD 5e Monster Generator and Owlbear"
      />
      <meta
        property="og:image"
        content="https://owlbear.online/owlbear.jpg"
      />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      <meta property="og:url" content="https://owlbear.online" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dizolivemint" />
      <meta name="twitter:creator" content="@dizolivemint" />
      <meta name="twitter:title" content="Owlbear Online" />
      <meta name="twitter:description" content="Dungeons and Dragons Content Generator and Stat Block Maker" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}

export default HeadContent