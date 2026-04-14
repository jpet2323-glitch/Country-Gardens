/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allowlist for next/image. Unsplash covers the design-system stock shots;
    // the two cloudfront origins are the Toast platform's image CDNs — the
    // unsigned one hosts restaurant assets like Logo.png, and the signed one
    // serves on-the-fly resized variants.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d28f3w0x9i80nq.cloudfront.net" },
      { protocol: "https", hostname: "d1w7312wesee68.cloudfront.net" },
    ],
  },
};

export default nextConfig;
