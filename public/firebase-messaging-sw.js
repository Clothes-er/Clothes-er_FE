self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  const data = e.data.json();

  if (!data) return;

  const { token, data: noticeTypeData, notification: resultData } = data;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
  };

  let targetUrl;

  /* 대여글 채팅과 유저 채팅에 따라 경로 설정 */
  if (noticeTypeData.type === "RENTAL_CHAT") {
    targetUrl = `/chat/${noticeTypeData.sourceId}?type=rental`;
  } else if (noticeTypeData.type === "USER_CHAT") {
    targetUrl = `/chat/${noticeTypeData.sourceId}?type=user`;
  }

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

  /* 알림 클릭 시 이벤트 처리 */
  self.addEventListener("notificationclick", function (event) {
    event.notification.close(); // 알림 닫기

    /* targetUrl로 이동 */
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          const client = clientList.find((c) => c.url.includes(targetUrl));
          if (client) {
            client.focus();
          } else {
            clients.openWindow(targetUrl);
          }
        })
    );
  });
});
