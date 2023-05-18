import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
// 🔽 追加 / `9.2.0`の部分を↑のFirestoreから貼り付けたコードのバージョンに合わせる
import {
  getFirestore,
  collection,
  addDoc, //ドキュメントを追加
  serverTimestamp,
  query, //手動で追加
  orderBy, //手動で追加 条件の指定
  onSnapshot, //手動で追加 並び替え
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

//ログイン情報のトークンを取り出す
const loginData = localStorage.getItem("loginJoho");
if (loginData) {
  const jsonData = JSON.parse(loginData);
  const token = jsonData.token;
  const username = jsonData.username;
  console.log(token, username);
  $("#nameP").html(username.displayName);
} else {
  console.log("error");
}

const firebaseConfig = {
  apiKey: "AIzaSyD35elexPRpTWGpTPLButa3_0-j-0sBMr0",
  authDomain: "social-app-70653.firebaseapp.com",
  projectId: "social-app-70653",
  storageBucket: "social-app-70653.appspot.com",
  messagingSenderId: "424247250561",
  appId: "1:424247250561:web:3c3933d028e2043a16c780",
};

//firebaseガイドから引用
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

//ログアウト
const auth = getAuth();
$("#logout").on("click", () => {
  signOut(auth)
    .then(() => {
      // ログアウト成功時の処理
      console.log("ログアウトしました");
      localStorage.removeItem("loginJoho");
      window.location.href = "index.html";
    })
    .catch((error) => {
      // ログアウトエラー時の処理
      console.error("ログアウトエラー:", error);
    });
});

//作品投稿
$("#send").on("click", function () {
  const fileInput1 = document.getElementById("picture1");
  let fileName1;
  const fileInput2 = document.getElementById("picture2");
  let fileName2;
  const fileInput3 = document.getElementById("picture3");
  let fileName3;
  const fileInput4 = document.getElementById("picture4");
  let fileName4;
  if (
    fileInput1.files.length === 0 ||
    fileInput2.files.length === 0 ||
    fileInput3.files.length === 0 ||
    fileInput4.files.length === 0
  ) {
    alert("画像を4つ選択してください。");
    return; // 処理を中断して終了
  } else if (
    fileInput1.files.length > 0 &&
    fileInput2.files.length > 0 &&
    fileInput3.files.length > 0 &&
    fileInput4.files.length > 0
  ) {
    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];
    const file3 = fileInput3.files[0];
    const file4 = fileInput4.files[0];
    fileName1 = file1.name;
    fileName2 = file2.name;
    fileName3 = file3.name;
    fileName4 = file4.name;
    const spaceRef1 = ref(storage, fileName1);
    const spaceRef2 = ref(storage, fileName2);
    const spaceRef3 = ref(storage, fileName3);
    const spaceRef4 = ref(storage, fileName4);
    console.log(spaceRef1, spaceRef2, spaceRef3, spaceRef4);
    uploadBytes(spaceRef1, file1).then((snapshot1) => {
      console.log("Uploaded a file 1!");
      uploadBytes(spaceRef2, file2).then((snapshot2) => {
        console.log("Uploaded a file 2!");
        uploadBytes(spaceRef3, file3).then((snapshot3) => {
          console.log("Uploaded a file 3!");
          uploadBytes(spaceRef4, file4).then((snapshot4) => {
            console.log("Uploaded a file 4!");
            const postData = {
              name: $("#nameP").text(), //name
              title: $("#titleP").val(), //title
              workComment: $("#work-comment").val(), //work-comment
              worktitle1: $("#worktitle1").val(), //作品1のタイトル
              kaisetsu1: $("#kaisetsu1").val(), //作品1の解説
              worktime1: $("#worktime1").val(), //作品1の制作年月
              worktitle2: $("#worktitle2").val(), //作品2のタイトル
              kaisetsu2: $("#kaisetsu2").val(), //作品2の解説
              worktime2: $("#worktime2").val(), //作品2の制作年月
              worktitle3: $("#worktitle3").val(), //作品3のタイトル
              kaisetsu3: $("#kaisetsu3").val(), //作品3の解説
              worktime3: $("#worktime3").val(), //作品3の制作年月
              worktitle4: $("#worktitle4").val(), //作品4のタイトル
              kaisetsu4: $("#kaisetsu4").val(), //作品4の解説
              worktime4: $("#worktime4").val(), //作品4の制作年月
              time: serverTimestamp(), //time
              fileName1: fileName1, //img1
              fileName2: fileName2, //img2
              fileName3: fileName3, //img3
              fileName4: fileName4, //img4
            };
            addDoc(collection(db, "work-post"), postData);
            $("#titleP").val("");
            $("#picture1").val("");
            $("#worktitle1").val("");
            $("#kaisetsu1").val("");
            $("#worktime1").val("");
            $("#picture2").val("");
            $("#worktitle2").val("");
            $("#kaisetsu2").val("");
            $("#worktime2").val("");
            $("#picture3").val("");
            $("#worktitle3").val("");
            $("#kaisetsu3").val("");
            $("#worktime3").val("");
            $("#picture4").val("");
            $("#worktitle4").val("");
            $("#kaisetsu4").val("");
            $("#worktime4").val("");
            $("#work-comment").val("");
          });
        });
      });
    });
  }
});
//このコードは失敗。uploadBytesで一気に3つは読み込めないらしい。
// uploadBytes(
//   spaceRef1,
//   file1,
//   spaceRef2,
//   file2,
//   spaceRef3,
//   file3
// ).then((snapshot) => {
//   console.log("Uploaded a file!");

$(document).ready(function () {
  $("#go-portfolio").click(function () {
    window.location.href = "portfolio.html";
  });
});
