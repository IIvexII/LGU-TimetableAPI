const axios = require('axios');

function request(sessionId, baseUrl, path, params) {
  const url = `${baseUrl}/${path}`;

  // configuration is specific for the timetable.edu.pk
  const config = {
    headers: {
      Cookie: `PHPSESSID=${sessionId}`,
      // Remove the https:// from the baseurl
      Host: baseUrl.slice(8),
      'Content-Length': '65',
      'Cache-Control': 'max-age=0',
      'Sec-Ch-Ua': '"Not;A=Brand";v="99", "Chromium";v="106"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': 'Linux',
      'Upgrade-Insecure-Requests': '1',
      Origin: baseUrl,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      Referer: url,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.9',
      Connection: 'close',
    },
  };

  return axios.post(url, params, config);
}

module.exports = request;
