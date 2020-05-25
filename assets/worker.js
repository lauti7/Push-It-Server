console.log('Service Worker Loaded..');

self.addEventListener('push', e => {
  const msg = e.data.json();
  console.log('Push recieved...');
  console.log(msg);
  self.registration.showNotification(msg.title, {
    body: msg.message,
    data: {
      messageId: msg.data.messageId,
      subscriberId: msg.data.subscriberId
    }
  })
})

self.addEventListener('notificationclick', e => {
  console.log(e);
  const click = {
    subscriberId: e.notification.data.subscriberId,
    messageId: e.notification.data.messageId,
    clickedUrl: e.currentTarget.location.origin
  }
  fetch('http://localhost:8000/api/clicks/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(click)
  })
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e))

  console.log('Click logged', click);
})
