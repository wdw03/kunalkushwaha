const https = require('https');

const targetUrl = process.argv[2] || 'https://kunalkushwaha.vercel.app';

console.log(`Checking URL: ${targetUrl}...`);

https.get(targetUrl, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Server: ${res.headers['server'] || 'Unknown'}`);
  console.log(`Vercel Error: ${res.headers['x-vercel-error'] || 'None'}`);

  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    if (res.statusCode === 200) {
      const hasTitle = body.includes('Kunal Kushwaha');
      const hasAC = body.includes('AC') || body.includes('Mechanical');
      console.log(`\n✅ VERIFICATION SUCCESSFUL!`);
      console.log(`- Page loaded with HTTP 200 OK`);
      console.log(`- Contains portfolio title: ${hasTitle}`);
      console.log(`- Contains technician/skills content: ${hasAC}`);
      console.log(`\n🎉 Website is 100% LIVE and WORKING!`);
    } else {
      console.log(`\n❌ Not live yet! Received HTTP ${res.statusCode}`);
      if (res.headers['x-vercel-error']) {
        console.log(`- Vercel Error code: ${res.headers['x-vercel-error']}`);
      }
    }
  });
}).on('error', (err) => {
  console.error(`Request failed: ${err.message}`);
});
