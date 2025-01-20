const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

  const baseUrl = 'https://ismartghana.com'; // Replace with your site's URL

 // List of static routes
const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: baseUrl });

  // Add routes to the sitemap stream
  staticRoutes.forEach((route) => sitemapStream.write(route));

  // Close the stream
  sitemapStream.end();

  // Generate sitemap and save it to the public directory
  const sitemap = await streamToPromise(sitemapStream).then((data) => data.toString());
  fs.writeFileSync('./public/sitemap.xml', sitemap);

  console.log('Sitemap generated at /public/sitemap.xml');
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
});
