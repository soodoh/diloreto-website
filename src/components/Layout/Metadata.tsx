import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

interface MetadataProps {
  title: string;
  description?: string;
  robots?: string;
}

const Metadata = (props: MetadataProps): ReactElement => {
  const { title, description, robots } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="google-site-verification" content="ZwC1ZTsoP45swAD5qd6Lw_jOVbNOh-2jz8Jki5Jh6A8" />

      {description && <meta name="description" content={description} />}

      <meta name="robots" content={robots} />
    </Helmet>
  );
};

Metadata.defaultProps = {
  robots: 'index, follow',
};

export default Metadata;
