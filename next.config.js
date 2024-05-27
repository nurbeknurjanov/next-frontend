const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  //trailingSlash: false,
  async redirects() {
    return [
      /*{
        source: "/en/about",
        destination: "/en/manual",
        permanent: true,
      },*/
    ];
  },
};

module.exports = withNextIntl(nextConfig);
