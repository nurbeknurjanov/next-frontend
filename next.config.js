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

/*nextConfig.module.rules.push({
  test: /\.svg$/i,
  issuer: /\.[jt]sx?$/,
  use: ['@svgr/webpack'],
});*/

module.exports = withNextIntl(nextConfig);
