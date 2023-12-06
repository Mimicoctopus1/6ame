/*This file is for if somebody downloads this app as a PWA which you can learn about at
https://glitch.com/~glitch-hello-installable
This file basically just runs everything that can only work if this app is installed as a PWA.
*/
const CACHE_NAME = 'OJVJPJ Game'; /*The app title under the icon on your phone.*/

let resourcesToCache = [
	'./',
	'./data/game.json',
	'package.json',
	'https://cdn.glitch.global/8daea706-1e6f-480a-9627-31efd187e265/ojvjpj.png?v=1701811931314',
	'./index.js',
	'./public/client.js',
	'./public/index.html',
	'./public/style.css',
];

window.addEventListener('install', function(e) {/*Upon installation...*/
	e.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			/*Prepare the correct cache, and to that cache...*/ return cache.addAll(resourcesToCache); /*...add the array.*/
		}),
	);
});

window.addEventListener('fetch', function(e) {/*When */
	e.respondWith(
		caches.match(e.request).then(function(response) { /**/
			return(response || fetch(e.request));
		}),
	);
});

const cacheWhitelist = ['OJVJPJ Game'];
window.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });