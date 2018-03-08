chrome.webRequest.onBeforeRequest.addListener(callback, getFilters(), getOptExtraInfoSpec());

function callback(details) {
  console.log(details);
  if (details.method === 'GET') {
    return { redirectUrl: `https://gft.com/administration` };
  }

  return null;
}

function getFilters() {
  return {
    types: ['main_frame'],
    urls: [
      ...urlHelper('google'),
      ...urlHelper('facebook'),
      ...urlHelper('youtube'),
      ...urlHelper('console.aws.amazon'),
      ],
  };
}

function getOptExtraInfoSpec() {
  return [
    'blocking' // the callback function is handled synchronously (REF: https://developer.chrome.com/extensions/webRequest)
  ];
}

// UTILS
function urlHelper(domain) {
  return [`*://*.${domain}.com/*`, `*://*.${domain}.com.br/*`]
}
