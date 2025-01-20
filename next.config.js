// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["localhost"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//         port: "",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;


// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Replace with your image hostname
        port: "", // Leave empty if no port is needed
        pathname: "/path/to/images/**", // Replace with your specific path or use '**' for all paths
      },
      // Add more patterns if needed
    ],
  },
};

module.exports = nextConfig;

