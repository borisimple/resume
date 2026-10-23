// Retire the service worker from the previous Bootstrap portfolio.
// Fresh visitors do not register this worker in the React application.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const scope = self.registration.scope
    if (await caches.has('sw-cache')) {
      const cache = await caches.open('sw-cache')
      const requests = await cache.keys()
      await Promise.all(requests.filter(request => request.url.startsWith(scope))
        .map(request => cache.delete(request)))
      if ((await cache.keys()).length === 0) await caches.delete('sw-cache')
    }
    await self.clients.claim()
    const clients = await self.clients.matchAll({ type: 'window' })
    await self.registration.unregister()
    await Promise.allSettled(clients.filter(client => client.url.startsWith(scope))
      .map(client => client.navigate(client.url)))
  })())
})
