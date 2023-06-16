const indexModule = (() => {
  // 現在のpathを表示
  const path = window.location.pathname;

  switch (path) {
    case "/":
      // Users.jsにあるfetchAllUsersメソッドを呼び出す
      return roomsModule.fetchAllRooms();

    case "/create.html":
      document.getElementById("save-btn").addEventListener("click", () => {
        return roomsModule.createRoom();
      });
      document.getElementById("cancel-btn").addEventListener("click", () => {
        return (window.location.href = "/");
      });
      break;

    case "/edit.html":
      // 調べる
      const uid = window.location.search.split("?uid=")[1];

      document.getElementById("save-btn").addEventListener("click", () => {
        return roomsModule.saveRoom(uid);
      });
      document.getElementById("cancel-btn").addEventListener("click", () => {
        return (window.location.href = "/");
      });
      document.getElementById("delete-btn").addEventListener("click", () => {
        return roomsModule.deleteRoom(uid);
      });

      return roomsModule.setExistingValue(uid);

    default:
      break;
  }
})();
