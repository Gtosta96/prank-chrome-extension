const callback = (details) => {
  console.log('beforeRequest ->', details);
  // return { redirectUrl: `https://gft.com/administration` };
}

const getFilters = () => {
  return {
    types: ['main_frame'],
    urls: ['<all_urls>'],
  };
}

const getOptExtraInfoSpec = () => {
  return [
    'blocking' // the callback function is handled synchronously (REF: https://developer.chrome.com/extensions/webRequest)
  ];
}

chrome.webRequest.onBeforeRequest.addListener(callback, getFilters(), getOptExtraInfoSpec());