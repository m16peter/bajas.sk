/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [
  ['/3rdpartylicenses.txt', '7b33193e2fe73832dd9171e44fc4db24'],
  ['/assets/app/features.json', '97d2c48ed4054b3b943b6ff28b4b9aae'],
  ['/assets/app/general.json', '10472869048214b1c8504f186c75ba30'],
  ['/assets/app/img/angular.svg', 'c3ce37284cd9f6157d886b2baa75404e'],
  ['/assets/app/img/contact-card.svg', '39745ab9d422bd4809bea366b19b7310'],
  ['/assets/app/img/contact.png', '8c5f81a7f8ec753b16075ead4a35eaad'],
  ['/assets/app/img/home.jpg', '170373230e047011f4a2a51b86acf3dd'],
  ['/assets/app/img/ro.svg', '4f5362508cf111eb93c5b3edc52b29a0'],
  ['/assets/app/img/sk.svg', '5993e55af0449ed6483e9f4dfbf6cf92'],
  ['/assets/app/languages.json', '4a637d7aab1d7167b2331edd441ccf9e'],
  ['/assets/favicons/android-chrome-192x192.png', '0987b803b6f28085a4e5124058512b0c'],
  ['/assets/favicons/android-chrome-512x512.png', '4deefd02252b79c4f149dd128f9211a3'],
  ['/assets/favicons/apple-touch-icon.png', 'f4ebc06298c14d412b935be568c3b9ca'],
  ['/assets/favicons/browserconfig.xml', '9ab97faa50301fe39a6aa119ca6dfed3'],
  ['/assets/favicons/favicon-16x16.png', '4a4277564f5832ed6cbdbf11a827f302'],
  ['/assets/favicons/favicon-32x32.png', '66a9b4d5442ee828fe304276e1aa9d47'],
  ['/assets/favicons/mstile-150x150.png', 'c2c1dfd85a729ee22993afe3b3b88abe'],
  ['/assets/favicons/safari-pinned-tab.svg', 'b3b26b0da462e83c6c6037a78189b355'],
  ['/assets/home/home.json', '7590e87b010222bdee9b8958aadf064b'],
  ['/assets/photo-archive/img/1.jpg', 'fc1c0116dc6838c8a75310199bbfe839'],
  ['/assets/photo-archive/img/11.jpg', '66988169a333180a725646bba9d94150'],
  ['/assets/photo-archive/img/2.jpg', 'a69cf6c5edc0855d6eba8d0afea59cf3'],
  ['/assets/photo-archive/img/3.jpg', '820858aaadc285084731c2a329075126'],
  ['/assets/photo-archive/img/4.jpg', 'a8201b84ad07c5724e435e9898debc22'],
  ['/assets/photo-archive/img/5.jpg', '020ea660e095296bfd2a5e69e935656b'],
  ['/assets/photo-archive/img/6.jpg', '03160c62028a48070773512122910c82'],
  ['/assets/photo-archive/img/7.jpg', 'd6f416595fbdba8aeee6f2df282d3cdc'],
  ['/assets/photo-archive/img/9.jpg', 'e870e8bc8f3969cdcea98342c2071956'],
  ['/assets/photo-archive/img/google-photos.svg', 'cddb5dc71512b59aa00a0addc9ded6aa'],
  ['/assets/video-archive/img/hillsong.png', '9d402bfa9a98ed440fcc25b8fb9989b2'],
  ['/assets/video-archive/img/youtube.svg', '775fee1304026b12c0abc3821d32f390'],
  ['/favicon.ico', '5aa0e23e46462ce01e29307b09ab2468'],
  ['/index.html', 'f34f8824493b22926cca25031d161eac'],
  ['/inline.318b50c57b4eba3d437b.bundle.js', '6eaa1608803b51f7d836604d9585670d'],
  ['/main.18c630cb8425dce10b39.bundle.js', '6feba4cb6293e46984f08ecb50874cde'],
  ['/manifest.json', '6ecd86ec6870ae73eabb77cb6e4144d9'],
  ['/polyfills.0a5214c62d251a24633e.bundle.js', '3ea8904d52df1b449b720ba061640c70']
];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');

var ignoreUrlParametersMatching = [/^utm_/];

var addDirectoryIndex = function(originalUrl, index) {
  var url = new URL(originalUrl);
  if (url.pathname.slice(-1) === '/') {
    url.pathname += index;
  }
  return url.toString();
};

var cleanResponse = function(originalResponse) {
  // If this is not a redirected response, then we don't have to do anything.
  if (!originalResponse.redirected) {
    return Promise.resolve(originalResponse);
  }

  // Firefox 50 and below doesn't support the Response.body stream, so we may
  // need to read the entire body to memory as a Blob.
  var bodyPromise = 'body' in originalResponse ? Promise.resolve(originalResponse.body) : originalResponse.blob();

  return bodyPromise.then(function(body) {
    // new Response() is happy when passed either a stream or a Blob.
    return new Response(body, {
      headers: originalResponse.headers,
      status: originalResponse.status,
      statusText: originalResponse.statusText
    });
  });
};

var createCacheKey = function(originalUrl, paramName, paramValue, dontCacheBustUrlsMatching) {
  // Create a new URL object to avoid modifying originalUrl.
  var url = new URL(originalUrl);

  // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
  // then add in the extra cache-busting URL parameter.
  if (!dontCacheBustUrlsMatching || !url.pathname.match(dontCacheBustUrlsMatching)) {
    url.search += (url.search ? '&' : '') + encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
  }

  return url.toString();
};

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
  // If the whitelist is empty, then consider all URLs to be whitelisted.
  if (whitelist.length === 0) {
    return true;
  }

  // Otherwise compare each path regex to the path of the URL passed in.
  var path = new URL(absoluteUrlString).pathname;
  return whitelist.some(function(whitelistedPathRegex) {
    return path.match(whitelistedPathRegex);
  });
};

var stripIgnoredUrlParameters = function(originalUrl, ignoreUrlParametersMatching) {
  var url = new URL(originalUrl);
  // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
  url.hash = '';

  url.search = url.search
    .slice(1) // Exclude initial '?'
    .split('&') // Split into an array of 'key=value' strings
    .map(function(kv) {
      return kv.split('='); // Split each 'key=value' string into a [key, value] array
    })
    .filter(function(kv) {
      return ignoreUrlParametersMatching.every(function(ignoredRegex) {
        return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
      });
    })
    .map(function(kv) {
      return kv.join('='); // Join each [key, value] array into a 'key=value' string
    })
    .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

  return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache
    .keys()
    .then(function(requests) {
      return requests.map(function(request) {
        return request.url;
      });
    })
    .then(function(urls) {
      return new Set(urls);
    });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        return setOfCachedUrls(cache).then(function(cachedUrls) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
              // If we don't have a key matching url in the cache already, add it.
              if (!cachedUrls.has(cacheKey)) {
                var request = new Request(cacheKey, { credentials: 'same-origin' });
                return fetch(request).then(function(response) {
                  // Bail out of installation unless we get back a 200 OK for
                  // every request.
                  if (!response.ok) {
                    throw new Error('Request for ' + cacheKey + ' returned a ' + 'response with status ' + response.status);
                  }

                  return cleanResponse(response).then(function(responseToCache) {
                    return cache.put(cacheKey, responseToCache);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        // Force the SW to transition from installing -> active state
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        return cache.keys().then(function(existingRequests) {
          return Promise.all(
            existingRequests.map(function(existingRequest) {
              if (!setOfExpectedUrls.has(existingRequest.url)) {
                return cache.delete(existingRequest);
              }
            })
          );
        });
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond && navigateFallback && event.request.mode === 'navigate' && isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches
          .open(cacheName)
          .then(function(cache) {
            return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
              if (response) {
                return response;
              }
              throw Error('The cached response that was expected is missing.');
            });
          })
          .catch(function(e) {
            // Fall back to just fetch()ing the request if some unexpected error
            // prevented the cached response from being valid.
            console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
            return fetch(event.request);
          })
      );
    }
  }
});
