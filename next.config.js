/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "blog.hyperiondev.com",
      "d1m75rqqgidzqn.cloudfront.net",
      "cdn.forbes.co",
      "www.cloud4c.com",
      "upload.wikimedia.org",
      "res.cloudinary.com",
      "icon-library.com",
    ],
  },
};

module.exports = nextConfig;
