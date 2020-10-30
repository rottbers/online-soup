import NextHead from 'next/head';

interface Props {
  title?: string;
  description?: string;
  imageURL?: string;
  path?: string;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const Head: React.FC<Props> = ({ title, description, imageURL, path }) => {
  const isFullURL = (url: string) => url.slice(0, 4).toLowerCase() === 'http';

  const metaTitle = (title ? title + ' | ' : '') + 'Online soup delivery';
  const metaURL = baseURL + path;

  const metaImageURL = imageURL
    ? isFullURL(imageURL)
      ? imageURL
      : baseURL + imageURL
    : baseURL + '/images/thumbnail.png';

  return (
    <NextHead>
      <title>{metaTitle}</title>
      <meta property="title" content={metaTitle} />
      <meta property="og:title" content={metaTitle} />
      <meta property="twitter:title" content={metaTitle} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}
      {path && (
        <>
          <meta property="og:url" content={metaURL} />
          <meta property="twitter:url" content={metaURL} />
        </>
      )}
      <meta property="og:image" content={metaImageURL} />
      <meta property="twitter:image" content={metaImageURL} />
      <meta property="twitter:card" content="summary_large_image" />
    </NextHead>
  );
};

export default Head;
