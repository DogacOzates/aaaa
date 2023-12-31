// // このjsファイルはグローバルではなく、usersModuleだけなので管理がしやすくなる
// const usersModule = (() => {
//   const BASE_URL = "http://localhost:8000/api/v1/users";

//   // ヘッダーの設定
//   const headers = new Headers();
//   // リクエストのbodyがjsonと明示的に示している
//   headers.set("Content-Type", "application/json");

//   return {
//     fetchAllUsers: async () => {
//       const res = await fetch(BASE_URL);
//       // res.json()で、jsのオブジェクト型にしてくれる
//       const users = await res.json();

//       for (let i = 0; i < users.length; i++) {
//         const user = users[i];
//         const body = `<tr>
//           <td>${user.id}</td>
//           <td>${user.name}</td>
//           <td>${user.profile}</td>
//           <td>${user.date_of_birth}</td>
//           <td>${user.created_at}</td>
//           <td>${user.updated_at}</td>
//           <td><a href="edit.html?uid=${user.id}">編集</a></td>
//         </tr>`;
//         // 第二引数にbodyを指定することで、bodyのデータをbeforeendで末尾に代入することができる
//         document
//           .getElementById("users-list")
//           .insertAdjacentHTML("beforeend", body);
//       }
//     },
//     createUser: async () => {
//       // htmlに入力された値を取得する
//       const name = document.getElementById("name").value;
//       const profile = document.getElementById("profile").value;
//       const dateOfBirth = document.getElementById("date-of-birth").value;

//       // リクエストのbody
//       const body = {
//         name: name,
//         profile: profile,
//         date_of_birth: dateOfBirth,
//       };

//       const res = await fetch(BASE_URL, {
//         // POSTメソッドなので記載が必要
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       });

//       const resJson = await res.json();

//       alert(resJson.message);
//       window.location.href = "/";
//     },
//     setExistingValue: async (uid) => {
//       const res = await fetch(BASE_URL + "/" + uid);
//       const resJson = await res.json();

//       document.getElementById("name").value = resJson.name;
//       document.getElementById("profile").value = resJson.profile;
//       document.getElementById("date-of-birth").value = resJson.date_of_birth;
//     },
//     saveUser: async (uid) => {
//       // htmlに入力された値を取得する
//       const name = document.getElementById("name").value;
//       const profile = document.getElementById("profile").value;
//       const dateOfBirth = document.getElementById("date-of-birth").value;

//       // リクエストのbody
//       const body = {
//         name: name,
//         profile: profile,
//         date_of_birth: dateOfBirth,
//       };

//       const res = await fetch(BASE_URL + "/" + uid, {
//         // POSTメソッドなので記載が必要
//         method: "PUT",
//         headers: headers,
//         body: JSON.stringify(body),
//       });

//       const resJson = await res.json();

//       alert(resJson.message);
//       window.location.href = "/";
//     },

//     deleteUser: async (uid) => {
//       const ret = window.confirm("このユーザーを削除しますか？？");

//       if (!ret) {
//         return false;
//       } else {
//         const res = await fetch(BASE_URL + "/" + uid, {
//           method: "DELETE",
//           headers: headers,
//         });

//         const resJson = await res.json();
//         alert(resJson.message);
//         window.location.href = "/";
//       }
//     },
//   };
// })();
