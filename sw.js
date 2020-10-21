importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js'
);
importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js');
importScripts(
  'https://www.unpkg.com/localforage@1.7.3/dist/localforage.nopromises.min.js'
);
importScripts('./firebaseMessagingSenderId.js');

const offlinePage = '/offline/index.html';

workbox.core.setCacheNameDetails({ prefix: 'jetzt' });

workbox.googleAnalytics.initialize();

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// NOTE: This is populated by workbox CLI
workbox.precaching.precacheAndRoute([{"revision":"a1d730c8f26cc0f9d3937b63eb77a987","url":"https://www.jetzt.de/manifest.json"},{"revision":"54b88edc8d350d4b31aeeeb3ab614d4d","url":"https://www.jetzt.de/favicon.ico"},{"revision":"069a51f88226efc16bcdaa7cf098b27e","url":"https://www.jetzt.de/images/jetzt_logo_rot.png"},{"revision":"e8f9240e26cf40c76358ae6b1258aaf6","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/din-condensed/din-condensed.woff2"},{"revision":"7ed7325e3df231a7c64c314e40c66a3d","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZSans/SZSansDigital-Web-Black.woff2"},{"revision":"2bb2028da3971db1d45ff6cf9588b277","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZSans/SZSansDigital-Web-Bold.woff2"},{"revision":"e019319697a0cd236bbd28a369a0773a","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZSans/SZSansDigital-Web-Light.woff2"},{"revision":"86bdc62fc68a6b8cf8220d48e4f13de1","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZSans/SZSansDigital-Web-Regular.woff2"},{"revision":"5f43676094b26f440591ad70fbca1618","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZText/SZText-Bold.woff2"},{"revision":"c306b9d973f13ac97dfc2cea69e5bb98","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZText/SZText-BoldItalic.woff2"},{"revision":"33db65d7b27970bec6250a50fe6c03e6","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZText/SZText-Regular.woff2"},{"revision":"f129008816788c221f0194074e55f0c5","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/modules/my-apostrophe-assets/fonts/SZText/SZText-RegularItalic.woff2"},{"revision":"77a6b37c94c1db6fb8b487925f781e7e","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/apos-minified/anon-ckghrc6290001c1y7qgrzbub7.css"},{"revision":"6e0aa11c7c3430b1ff494249582ce16e","url":"https://caching-production.jetzt.de/assets/ckghrc6290001c1y7qgrzbub7/apos-minified/anon-ckghrc6290001c1y7qgrzbub7.js"},{"revision":"18f14f57444acdcc5f79c804d596d0d6","url":"https://www.jetzt.de/offline/animation.json"},{"revision":"780a4c9909764753524fcac6597093f5","url":"https://www.jetzt.de/offline/index.html"},{"revision":"a6f4f2eb9c5192d6f9f026331db70cb8","url":"https://www.jetzt.de/offline/offline.83e1b21810d9dafdd489.bundle.js"},{"revision":"9962a41f9941d7b8a54a9b4c9047264e","url":"https://www.jetzt.de/offline/offline.83e1b21810d9dafdd489.css"}]);

// TODO: Move image caching to ServiceWorker
// workbox.routing.registerRoute(
//   /^https:\/\/caching-.*\.jetzt\.de\/.*/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 604800, // 7 days
//         purgeOnQuotaError: true
//       })
//     ]
//   }),
//   'GET'
// );

const fallbackHandler = (strategy) => async (args) => {
  try {
    const response = await strategy.handle(args);

    return (
      response ||
      await workbox.precaching.matchPrecache(offlinePage)
    );
  } catch (error) {
    return await workbox.precaching.matchPrecache(offlinePage);
  }
};

const indexStrategy = new workbox.strategies.NetworkFirst({
  matchOptions: {
    ignoreSearch: true,
  },
});

workbox.routing.registerRoute('/', fallbackHandler(indexStrategy));

const pagesStrategy = new workbox.strategies.NetworkFirst({
  cacheName: 'pages',
});

workbox.routing.registerRoute(
  /^https:\/\/.*\.jetzt\.de\/[0-9a-z-]+\/[0-9a-z-]+$/,
  fallbackHandler(pagesStrategy)
);

firebase.initializeApp({
  messagingSenderId, // eslint-disable-line no-undef, no-unused-vars
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // event.waitUntil(clients.openWindow(event.notification.data.link));
  event.waitUntil(
    // eslint-disable-next-line no-undef
    localforage
      .getItem('pushedArticles')
      .then((articles) => {
        return articles ? JSON.parse(articles) : [];
      })
      .then((articles) => {
        return articles.map((article) => {
          if (event.notification.data.link === article.link) {
            // eslint-disable-next-line no-param-reassign
            article.read = true;
          }

          return article;
        });
      })
      .then((readArticles) => {
        // eslint-disable-next-line no-undef
        return localforage.setItem(
          'pushedArticles',
          JSON.stringify(readArticles)
        );
      })
      .then(() => {
        // eslint-disable-next-line no-undef
        return clients.openWindow(event.notification.data.link);
      })
      .catch((error) => {
        throw error;
      })
  );
});

function backgroundMessageHandler(payload) {
  const { title, icon, image } = payload.data;
  const { link } = payload.fcmOptions;
  const notificationOptions = {
    icon,
    data: { link },
  };

  // eslint-disable-next-line no-undef
  return localforage
    .getItem('pushedArticles')
    .then((pushedArticles) => {
      if (!pushedArticles) {
        return [];
      }

      return JSON.parse(pushedArticles);
    })
    .then((pushedArticles) => {
      // eslint-disable-next-line no-undef
      pushedArticles.unshift({ title, link, image, read: false });
      // eslint-disable-next-line no-undef
      localforage.setItem('pushedArticles', JSON.stringify(pushedArticles));

      return self.registration.showNotification(title, notificationOptions);
    })
    .catch(console.error);
}

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(backgroundMessageHandler);
}
