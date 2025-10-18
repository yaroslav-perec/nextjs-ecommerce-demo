/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.dummyjson.com',
				pathname: '/data/**',
			},
		],
	},
};

export default nextConfig;