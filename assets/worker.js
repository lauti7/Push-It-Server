console.log('Service Worker Loaded..');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push recieved...');
  self.registration.showNotification(data.title, {
    body: data.message
  })
})

self.addEventListener('notificationclick', e => {
  console.log(e);
})
