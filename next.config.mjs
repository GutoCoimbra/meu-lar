// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.sccoimbra.com.br"], // Adicione o domínio aqui
  },
};

export default nextConfig; // Use export default em vez de module.exports
