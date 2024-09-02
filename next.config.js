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
  env: {
    production: "https://portfolio-backend-fdxe.onrender.com",
    local: "http://127.0.0.1:8000",
  },
};

module.exports = nextConfig;
