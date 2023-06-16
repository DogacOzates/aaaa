// このjsファイルはグローバルではなく、roomsModuleだけなので管理がしやすくなる
const roomsModule = (() => {
  const BASE_URL = "http://localhost:8000/api/v1/rooms";

  // ヘッダーの設定
  const headers = new Headers();
  // リクエストのbodyがjsonと明示的に示している
  headers.set("Content-Type", "application/json");

  return {
    fetchAllRooms: async () => {
      const res = await fetch(BASE_URL);
      // res.json()で、jsのオブジェクト型にしてくれる
      const rooms = await res.json();

      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const body = `<tr>
          <td>${room.id}</td>
          <td>${room.name}</td>
          <td>${room.created_at}</td>
          <td>${room.updated_at}</td>
          <td><a href="edit.html?uid=${room.id}">Edit</a></td>
          <td><a href="chat.html?uid=${room.id}">Join</a></td>
        </tr>`;
        // 第二引数にbodyを指定することで、bodyのデータをbeforeendで末尾に代入することができる
        document
          .getElementById("rooms-list")
          .insertAdjacentHTML("beforeend", body);
      }
    },

    createRoom: async () => {
      // htmlに入力された値を取得する
      const name = document.getElementById("name").value;
      // リクエストのbody
      const body = {
        name: name,
      };

      const res = await fetch(BASE_URL, {
        // POSTメソッドなので記載が必要
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const resJson = await res.json();

      alert(resJson.message);
      window.location.href = "/";
    },
    setExistingValue: async (uid) => {
      const res = await fetch(BASE_URL + "/" + uid);
      const resJson = await res.json();

      document.getElementById("name").value = resJson.name;
    },

    saveRoom: async (uid) => {
      // htmlに入力された値を取得する
      const name = document.getElementById("name").value;

      // リクエストのbody
      const body = {
        name: name,
      };

      const res = await fetch(BASE_URL + "/" + uid, {
        // 編集なのでPUTメソッドなので記載が必要
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });

      const resJson = await res.json();

      alert(resJson.message);
      window.location.href = "/";
    },

    deleteRoom: async (uid) => {
      const ret = window.confirm("Delete this room??");

      if (!ret) {
        return false;
      } else {
        const res = await fetch(BASE_URL + "/" + uid, {
          method: "DELETE",
          headers: headers,
        });

        const resJson = await res.json();
        alert(resJson.message);
        window.location.href = "/";
      }
    },
  };
})();
