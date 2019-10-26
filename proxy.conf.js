const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
 */

// dev
const targetDev = 'http://dev2.apps.thermofisher.com';

// test
// const target = 'http://test.apps.thermofisher.com';

// fanling
// const target = 'http://10.69.20.83:8080';

// Wenjie
const target = 'http://10.69.20.96:8080';

// Sunlei
// const target = 'http://10.68.161.134:8080';

const proxyConfig = [
  {
    context: '/apps',
    target: targetDev,
    changeOrigin: true,
    secure: false
  },
  {
    context: '/dhap-amp',
    target: targetDev,
    changeOrigin: true,
    secure: false
  },
  {
    context: '/dhap-components',
    target: targetDev,
    changeOrigin: true,
    secure: false
  },
  {
    context: '/api',
    target: target,
    changeOrigin: true,
    secure: false
  }
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(entry => { entry.agent = agent; });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
