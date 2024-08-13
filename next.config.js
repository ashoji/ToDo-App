// next.config.js
require('dotenv').config();

module.exports = {
  // Add your Next.js configuration here
  env: {
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=(), join-ad-interest-group=(), run-ad-auction=()',
          },
        ],
      },
    ];
  },
};