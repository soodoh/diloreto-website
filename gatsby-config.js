// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

// Load environment variables from project
dotenv.config();
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error('Contentful spaceId and the delivery token need to be provided.');
}

const siteUrl = 'https://diloreto.com';

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    'gatsby-plugin-layout',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-141361857-1',
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Old Standard TT', 'Karla'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'DiLoreto Family Website',
        short_name: 'DiLoreto Family',
        start_url: '/',
        background_color: '#d1d1d1',
        theme_color: '#7d89c1',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: { spaceId, accessToken },
    },
  ],
};
