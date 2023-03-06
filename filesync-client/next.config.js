/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_PROTOCAL: process.env.SERVER_PROTOCAL,
    SERVER_HOST: process.env.SERVER_HOST,
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_ADDR: `${process.env.SERVER_PROTOCAL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  }
}

module.exports = nextConfig
