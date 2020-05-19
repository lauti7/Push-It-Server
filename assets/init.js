var PUBLIC_VAPID_KEY = 'BDdrQ-nQNed2Bc9CXNLJyPAZXkKxgF5LMzfJaTbt139P9IwAcpwVkBKUUGZkSwPpVqOqX6lV1CIct3TFssf03C4'
var appId = ''
var key64 = urlBase64ToUint8Array(PUBLIC_VAPID_KEY)

function browserDetect() {
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  if (isOpera) {
    return false
  }

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  if (isFirefox) {
    return 'Firefox'
  }

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  if (isSafari) {
    return false
  }

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  if (isIE) {
    return false
  }

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  if (isEdge) {
    return false
  }

  // Chrome 1 - 79
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  if (isChrome) {
    return 'Chrome'
  }

  // Edge (based on chromium) detection
  var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
  if (isEdgeChromium) {
    return false
  }

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  if (isBlink) {
    return false
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function getLanguage() {
    let lang = navigator.language || navigator.userLanguage;
    return lang.split('-')[1]
}

function loadPrompt() {
  //Download Push Config
  console.log('Showing Promp Slide');
  const template =
  `<div style="width:400px;
    height: 150px;
    padding: 10px 0;
    background-color:rgb(255, 255, 255);
    border: 2px solid rgb(244, 244, 244);
    box-shadow: -3px 3px 1px 1px rgba(0,0,0,0.05);
    position: absolute;
    top:0;
    left: 50%;
    right: 50%;
    margin-left:-150px;">
    <div style="display:flex;">
      <img  style="width: 130px; height:115px;" src="http://localhost:8000/assets/notificationbell1.gif" alt="Notificatio Bell" />
      <span><p style="padding-top:5px;">Do you like to receive notifications from us?</p></span>
    </div>
    <div style="width:100%; display: flex; justify-content:space-around; align-content: center;margin-left: 5px; margin-bottom: 5px;">
      <div>
        <button style="background-color:rgb(20, 141, 232); padding:10px 15px;  color: white; font-size: 0.8em; border: 1px solid rgb(20, 141, 232); border-radius:3px" onClick="acepptPushPromt(event)" id='allow'>Allow</button>
      </div>
      <div>
        <button style="background-color:rgba(63, 65, 62, 0.66); padding:10px 15px;  color: white; font-size: 0.8em; border: 1px solid rgba(63, 65, 62, 0.66); border-radius:3px" onClick="denyPushPrompt(event)"  id='deny'>Deny</button>
      </div>
    </div>
  </div>`
  document.body.innerHTML += template
}

function initializePushIt(){
  if (!getCookie('pushItCustomPrompt')) {
    loadPrompt()
  } else {
    let customPermission = getCookie('pushItCustomPrompt')
    if (customPermission.pushItCustomPrompt === 'false') {
      return false;
    }
    webPushInitialize()
  }
}

function acepptPushPromt(e) {
  e.target.parentNode.parentNode.parentNode.style = 'display:none;'
  pushPrompt = true
  setCookie('pushItCustomPrompt', 'true')
  webPushInitialize()
}

function denyPushPrompt(e){
  e.target.parentNode.parentNode.parentNode.style = 'display:none;'
  pushPrompt = false;
  setCookie('pushItCustomPrompt', 'false', 7)
}

function webPushInitialize() {
  console.log('Initializing push');
  const permission = checkPermissions()
  if (permission == "denied") {
    console.log('User has denied push');
    if (!getCookie('subscription_id')) {
      return false;
    }
    const subId = getCookie('subscriber_id').subscriber_id
    unsubscribe(subId)
  } else if(permission == "granted") {
    console.log('User has already granted permisions');
    const subId = getCookie('subscriber_id').subscriber_id
    updateSubscriberLastSession(subId)
  } else {
    console.log('Have to ask...');
    pushNotificationSubscribe()
  }
}

function checkPermissions() {
  if ("Notification" in window && "permission" in window.Notification) {
    return Notification.permission
  } else {
    return false
  }
}

function subscriptionId(endpoint) {
  let endpointParts = endpoint.toString().split("/")
  return endpointParts[endpointParts.length - 1];
}

function pushNotificationSubscribe() {
 console.log("Asking...");

 if ('serviceWorker' in navigator) {
   console.log('Service worker supported.');
   registerServiceWorker()
   navigator.serviceWorker.ready
    .then(register => {
      console.log('Service worker is active', register.active);
      register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key64
      })
      .then(subscription => {
        let subId = subscriptionId(subscription.endpoint)
        setCookie('subscriber_id', subId)
        sendSubscriber(subscription, subId)
      })
      .catch(err => {
        let permision = checkPermissions()
        if (permision === "denied") {
          console.log('Subscription deniend.');
          // Opt in function
        }
      })
    })
 } else {
   return false;
 }
}

async function registerServiceWorker(){
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  }).catch(err => {
    if (err) {
      console.log('register worker catch');
      console.log(err);
      //if cookie sub id, unsubscribe
      //if not cookie, return false
    }
  })
  console.log('serviceWorker Registered...');
  if (register) {
    return true;
  }
}

function supportPush(){
  //return 'PushManager' in window && (checkHttps());
  return 'PushManager' in window;
}

function checkHttps() {
  let protocol = window.location.protocol
  return "https:" == protocol
}

function generateRandomId() {
    function randomId() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return randomId() + randomId() + "-" + randomId() + "-" + randomId() + "-" + randomId()+ randomId()
}

function setCookie(name, value, days) {
  if (days) {
    var d = new Date();
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = d.toGMTString();
  }
  console.log('Setting cookie...');
  if (days) {
    document.cookie = `${name}=${value};expires=${expires}; path=/; domain=localhost`
  } else {
    document.cookie =`${name}=${value};expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/; domain=localhost`
  }
}

function getCookie(name) {
  let cookies = document.cookie.replace(' ', '')
  cookies = cookies.split(';')
  let cookiesJson = cookies.filter(cookie => {
    let [key, value] = cookie.split('=');
    if (key.indexOf(name) > -1) {
      return true;
    } else {
      return false;
    }
  }).map(cookie => {
    let [key, value] = cookie.split('=');
    return ({
      [key]: value
    })
  })
  if (cookiesJson[0]) {
    return cookiesJson[0]
  } else {
    return false;
  }
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
}

async function sendSubscriber(subscription, subscriberId) {

  const ip = await fetch('http://www.geoplugin.net/json.gp').then(res => res.json())

  var os="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) os="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) os="MacOS";
  if (navigator.appVersion.indexOf("iPhone")!=-1) os="iOS";
  if (navigator.appVersion.indexOf("Android")!=-1) os="Androird";

  const browser = browserDetect()
  const lang = getLanguage()
  const lastSession = new Date().toISOString()
  console.log('LastSession', lastSession);

  await fetch('http://localhost:8000/api/subscribers/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({subscriber: {os, subscription, subscriberId, appId, country: ip.geoplugin_countryCode, browser, lang, lastSession }})
  })
  console.log('Subscribed');
}

async function updateSubscriberLastSession(subscriberId) {
  const lastSession = new Date().toISOString()
  await fetch('http://localhost:8000/api/subscribers/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({subscriber: {subscriberId, lastSession}})
  })
  console.log('Update Last Session');

}

async function unsubscribe(subscriberId){
  await fetch('http://localhost:8000/api/subscribers/unsubscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({subscriberId})
  })
  console.log('Unsubscribe');
}

!function(){
  console.log('Init Push-It Service..');
  if (supportPush()) {
    initializePushIt()
  }
}()
