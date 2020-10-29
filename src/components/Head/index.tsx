import NextHead from 'next/head';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const Head: React.FC<Props> = ({ title, description, image }) => {
  const metaTitle = (title ? title + ' | ' : '') + 'Online soup delivery';

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
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="twitter:image" content={image} />
        </>
      )}
      {/* <meta property="og:url" content={metaUrl} />
      <meta property="twitter:url" content={metaUrl} /> */}
      <meta property="twitter:card" content="summary_large_image" />
    </NextHead>
  );
};

export default Head;
