import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IPersonalProfile } from '../../types/portfolio';

interface SEOHeadProps {
  personal: IPersonalProfile;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ personal }) => {
  return (
    <Helmet>
      <title>{personal.name} | {personal.title}</title>
      <meta name="description" content={personal.bio} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      {/* OpenGraph Metadata */}
      <meta property="og:title" content={`${personal.name} | ${personal.title}`} />
      <meta property="og:description" content={personal.bio} />
      <meta property="og:image" content="/favicon.svg" />
      <meta property="og:type" content="website" />

      {/* Twitter Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${personal.name} | ${personal.title}`} />
      <meta name="twitter:description" content={personal.bio} />
      <meta name="twitter:image" content="/favicon.svg" />
    </Helmet>
  );
};
