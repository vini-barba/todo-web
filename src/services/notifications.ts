import api from './api';

/* eslint-disable no-restricted-globals */
async function getUserPermission() {
  return Notification.requestPermission();
}

async function createNotificationSubscription(
  pushServerPublicKey: string,
  userId: string
) {
  const serviceWorker = await navigator.serviceWorker.ready;
  const subscription = await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });

  return {
    userId,
    subscription,
  };
}

function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}
async function sendSubscriptionToServer(subscription: any) {
  return api
    .post('/notification/subscription', subscription)
    .catch((err) => err.response.data);
}

export default async function saveSubscription(userId: string) {
  if (isPushNotificationSupported()) {
    const permission = await getUserPermission();
    if (permission !== 'granted') {
      return;
    }
    const { data: publicVapidKey } = await api.get('/notification/key');

    const subscription = await createNotificationSubscription(
      publicVapidKey,
      userId
    );
    await sendSubscriptionToServer(subscription);
  }
}
