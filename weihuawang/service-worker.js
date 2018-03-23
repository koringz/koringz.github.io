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

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["/bower_components/app-layout/app-drawer/app-drawer.html","dc0857edbf836e717d5d0d315f37caff"],["/bower_components/app-layout/app-grid/app-grid-style.html","70d3ed33a416750cdff672bc55c04e4e"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","ae5df95549919ee01020075dc6e25a01"],["/bower_components/app-layout/app-header/app-header.html","f8996da39d879e6d3a0871e48ac84c27"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","164f065b476fc80bb0832895a64d9690"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","c7636169ac4180d02a08c4fe7ef41c18"],["/bower_components/app-layout/helpers/helpers.html","76e084f8a0e1add6843d20d376ecf1f4"],["/bower_components/app-route/app-location.html","9052397b983d288303c6efe539606113"],["/bower_components/app-route/app-route-converter-behavior.html","2c9b3ff13a631bf794eb47add6a74458"],["/bower_components/app-route/app-route.html","ec9942b5cc7b8ecf337712246403e968"],["/bower_components/font-roboto/roboto.html","4fa582f0702a651ddea0643b823749e7"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","298da29f86055cf03a05254d7576465b"],["/bower_components/iron-behaviors/iron-button-state.html","28ebfe02b0f1e8e3a7bef827a23fa374"],["/bower_components/iron-behaviors/iron-control-state.html","d2564a7127188bb0bcce3d719ba65529"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","ee79b2b196b19b2b107b869f9278aac9"],["/bower_components/iron-flex-layout/iron-flex-layout.html","e29f094248af45222f8cda50c345d14b"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","e0693f47d1bb61268ae9591fa5477011"],["/bower_components/iron-icon/iron-icon.html","1793efd7a541eb4aaddb01439587af94"],["/bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["/bower_components/iron-icons/maps-icons.html","f59f08ebc2bc27ff52acb66805a29df7"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","697ec822fe829a3c382e555e8259bf70"],["/bower_components/iron-location/iron-location.html","c314b97c8f222e336ade1ab7bb6a06a8"],["/bower_components/iron-location/iron-query-params.html","19bdd4b080707939bf535a69d4f5df99"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","62cf3ac7f51f26a12b800644ef1df768"],["/bower_components/iron-menu-behavior/iron-menubar-behavior.html","6a69be36fd4a249ad94337059d4b9c33"],["/bower_components/iron-meta/iron-meta.html","a01967fda8d42f3e63adc1c2e3945be3"],["/bower_components/iron-pages/iron-pages.html","86f23afaff9ffeb4cbe813878da422be"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e9131c25c25968c88b5f7c0f4300e2e7"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","dd7c91617b240bd4c15438581894196f"],["/bower_components/iron-selector/iron-multi-selectable.html","4c3924e1d92c72b86343c0d160d1e268"],["/bower_components/iron-selector/iron-selectable.html","bd348105f7ab0f112c80d182697f823a"],["/bower_components/iron-selector/iron-selection.html","a35d01bb93772ecc27e1037e8f027193"],["/bower_components/iron-selector/iron-selector.html","b16e67c27ef856b12149a467cc5223b0"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","17e2e704ad282c3d7a1e8635a770697a"],["/bower_components/paper-behaviors/paper-checked-element-behavior.html","300385d4f6d53226918d81823a4f6151"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","75f48b041a91699a40bf2dac12fd4f03"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","ac5cdb37beb1aef31f3bfb72fbfa5d63"],["/bower_components/paper-checkbox/paper-checkbox.html","e70d39906a6dcd38d0313ad2e4117419"],["/bower_components/paper-icon-button/paper-icon-button.html","c83c451c5849a53e86741bdbc5275d9f"],["/bower_components/paper-item/paper-item-behavior.html","fa1e9edce996ee83aacc47a546f8bff4"],["/bower_components/paper-item/paper-item-shared-styles.html","707462d48804b243743631a0bd8b9616"],["/bower_components/paper-item/paper-item.html","8eec15ba1830c20c43869882f8129abf"],["/bower_components/paper-listbox/paper-listbox.html","38733a414facfdfa92e4db2d0c2f4196"],["/bower_components/paper-ripple/paper-ripple.html","e81a314647d653875920d26724593017"],["/bower_components/paper-styles/color.html","0f41221a1bbeaea2522075d761484526"],["/bower_components/paper-styles/default-theme.html","f34b998f9bf04c8acf38422f1b89da5d"],["/bower_components/paper-styles/typography.html","889571ccbfca057ed1dbfb487a785f56"],["/bower_components/paper-tabs/paper-tab.html","23888fea19b68413cb8e11146b075229"],["/bower_components/paper-tabs/paper-tabs-icons.html","f8e9e4ba00752fc54f1046143ba1be28"],["/bower_components/paper-tabs/paper-tabs.html","c34194193a4ae951c2eab4fe84b2a7fa"],["/bower_components/polymer/polymer-micro.html","ef33863e8ebb754b116e37c18d39f984"],["/bower_components/polymer/polymer-mini.html","5d646a4c94b675ee6b61dac5d108ea72"],["/bower_components/polymer/polymer.html","20a6eab5a3ad0dd807337e53d857203d"],["/index.html","a8f42793043719402539120f40de7351"],["/src/weihua-app/fullpage.js.html","941991b4e60683e64bf46ce24febf6e1"],["/src/weihua-app/jquery.js.html","fad1cc31fa7c7575ca9ecb30fc906cf7"],["/src/weihua-app/weihua-app.html","566a6cdb84396b176033a77c282ad6c7"],["/src/weihua-footer/weihua-footer.html","037f0560d402882a008a1b15faba2422"],["/src/weihua-header/weihua-header.html","602098a02762c9949c771b81367e496a"],["/src/weihua-home/weihua-home.html","511577b0d25fc4a69132d4e82ad74358"],["/src/weihua-major/weihua-major.html","084d82a347a3cdf1c816b7081a76df80"],["/src/weihua-service/weihua-service.html","e17b14b2414f89d754628219c5272d8d"],["/src/weihua-us/weihua-us.html","0f660cda907293146975499451150196"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
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


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




