chrome.webRequest.onBeforeRequest.addListener(callback, getFilters(), getOptExtraInfoSpec());

function callback(details) {
  console.log('beforeRequest ->', details);
  if (details.method === 'GET') {
    return { redirectUrl: `https://gft.com/administration` };
  }

  return null;
}

function getFilters() {
  return {
    types: ['main_frame'],
    urls: [
      // ...urlHelper('google'),
      ...urlHelper('facebook'),
      ...urlHelper('youtube'),
      ...urlHelper('console.aws.amazon'),
      ...urlHelper('gft'),
      ],
  };

  // UTILS
  function urlHelper(domain) {
    return [`*://*.${domain}.com/*`, `*://*.${domain}.com.br/*`]
  }
}

function getOptExtraInfoSpec() {
  return [
    'blocking' // the callback function is handled synchronously (REF: https://developer.chrome.com/extensions/webRequest)
  ];
}
