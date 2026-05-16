// 등교 알림 서비스워커 v1

const CACHE_NAME = "school-alert-v1";
const CACHED_FILES = [
  "/classroom.html",
  "/index.html",
  "/manifest.json"
];

// 설치 시 파일 캐시
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHED_FILES);
    })
  );
  self.skipWaiting();
});

// 활성화 시 이전 캐시 삭제
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 네트워크 요청 처리 (네트워크 우선, 실패 시 캐시)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// 푸시 알림 수신
self.addEventListener("push", event => {
  let data = { title: "등교 알림", body: "새로운 알림이 있습니다." };
  try { data = event.data.json(); } catch(e) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "school-alert",
      renotify: true,
    })
  );
});

// 알림 클릭 시 교실 화면 열기
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes("classroom.html") && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow("/classroom.html");
    })
  );
});

// 메인 페이지에서 알림 트리거 메시지 수신
self.addEventListener("message", event => {
  if (event.data && event.data.type === "NEW_ALERT") {
    const { name, course, grade, className, alertType } = event.data;
    const emoji = alertType === "arrive" ? "🏠" : "🚶";
    const label = alertType === "arrive" ? "도착" : "마중";

    self.registration.showNotification(`${emoji} 학생 ${label}`, {
      body: `${course} ${grade} ${className}\n${name} 학생`,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "school-alert",
      renotify: true,
    });
  }
});
