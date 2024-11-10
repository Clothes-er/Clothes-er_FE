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
    icon: resultData.image || null,
  };

  let targetUrl;

  /* 알림 유형에 따라 targetUrl 설정 */
  switch (noticeTypeData.type) {
    case "RENTAL_CHAT":
      targetUrl = `/chat/${noticeTypeData.sourceId}?type=rental`;
      break;
    case "USER_CHAT":
      targetUrl = `/chat/${noticeTypeData.sourceId}?type=user`;
      break;
    case "FOLLOW":
      targetUrl = `/user/${noticeTypeData.sourceId}`;
      break;
    case "REPORT":
      targetUrl = `/notification`;
      break;
    case "REPORT_NO_URL":
      targetUrl = "";
      break;
    default:
      targetUrl = "/";
      break;
  }

  notificationOptions.data = { targetUrl };
  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

  /* 알림 클릭 시 이벤트 처리 */
  self.addEventListener("notificationclick", function (event) {
    event.notification.close(); // 알림 닫기

    const targetUrl = event.notification.data?.targetUrl;
    if (!targetUrl) return;

    /* targetUrl로 이동 */
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          const client = clientList.find((c) => c.url.includes(targetUrl));
          if (client) {
            client.focus();
          } else if (targetUrl) {
            clients.openWindow(targetUrl).catch((error) => {
              console.error("Unable to open window:", error);
            });
          }
        })
    );
  });
});
