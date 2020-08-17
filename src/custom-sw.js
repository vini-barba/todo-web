self.addEventListener('push', function (event) {
  const notificationPayload = event.data.json() || {};
  const title = notificationPayload.notification.title || 'To-do';
  const { options } = notificationPayload.notification;
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        const url =
          (event.notification.data && event.notification.data.urlToOpen) ||
          false;

        if (url) {
          const tab = clientList.filter(
            (client) => client.url.includes(url) && 'focus' in client
          );
          if (tab.length > 0) {
            return tab[0].focus();
          }

          return clients.openWindow(url);
        }
      })
  );
});
