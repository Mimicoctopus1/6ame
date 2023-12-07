/*This file does everything only necessary when this app is downloaded to the home screen.*/

// Specify what we want added to the cache for offline use
self.addEventListener("install", function(e) {
  e.waitUntil(
    // Give the cache a name
    caches.open("ojvjpjgame-cache").then(function(cache) {
      // Cache the homepage and stylesheets - add any assets you want to cache!
      return cache.addAll(["/", "/client.css", "/client.js"]);
    })
  );
});

// Network falling back to cache approach
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});

// Listen for push notifications
self.addEventListener("push", function(e) {
  const data = e.data.json();/*Get the data from the input of the push*/
  let promises = [];/*Add an array for future use.*/

  if ("setAppBadge" in self.navigator) {
    /*This is hard-coded to "1" because getNotifications is tricky?*/
    const promise = self.navigator.setAppBadge(1);
    promises.push(promise);/*Add a promise to the end of the array*/
  }

  // Promise to show a notification
  promises.push(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    })
  );

  // Finally...
  event.waitUntil(Promise.all(promises));
});
