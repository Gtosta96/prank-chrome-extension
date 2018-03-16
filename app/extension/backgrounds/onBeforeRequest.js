const callback = (details) => {
  console.log('beforeRequest ->', details);
  // return { redirectUrl: `https://gft.com/administration` };
};

const getFilters = () => ({
  types: ['main_frame'],
  urls: ['<all_urls>'],
});

const getOptExtraInfoSpec = () => [
  'blocking', // the callback function is handled synchronously (REF: https://developer.chrome.com/extensions/webRequest)
];

chrome.webRequest.onBeforeRequest.addListener(callback, getFilters(), getOptExtraInfoSpec());
