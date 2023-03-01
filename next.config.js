/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		],
		domains: ['api.libraryiksu.kg']
	},
	typescript: {
		ignoreBuildErrors: true
	}
}

module.exports = nextConfig
