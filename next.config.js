/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "forms.aweber.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
