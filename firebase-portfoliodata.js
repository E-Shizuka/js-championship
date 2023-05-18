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

// データを取り出す条件
const q = query(collection(db, "work-post"), orderBy("time", "desc"));
async function getImageUrlFromStorage(
  fileName1,
  fileName2,
  fileName3,
  fileName4
) {
  const Image1 = ref(storage, fileName1);
  const url1 = await getDownloadURL(Image1);
  const Image2 = ref(storage, fileName2);
  const url2 = await getDownloadURL(Image2);
  const Image3 = ref(storage, fileName3);
  const url3 = await getDownloadURL(Image3);
  const Image4 = ref(storage, fileName4);
  const url4 = await getDownloadURL(Image4);
  console.log(url1, url2, url3, url4);
  return { url1, url2, url3, url4 };
}

onSnapshot(q, async (querySnapshot) => {
  // ここから下は毎回同じ処理
  console.log(querySnapshot.docs);
  const documents = [];
  querySnapshot.docs.forEach(function (doc) {
    const document = {
      id: doc.id,
      data: doc.data(),
    };
    documents.push(document);
    console.log(document.data);
  });

  // 確認用
  console.log(documents);

  //タグを画面に表示 自分で定義
  const htmlElements = [];
  const artist = [];
  for (const document of documents) {
    const timestamp = document.data.time;
    const fileName1 = document.data.fileName1;
    const fileName2 = document.data.fileName2;
    const fileName3 = document.data.fileName3;
    const fileName4 = document.data.fileName4;
    const timeStr = timestamp
      ? convertTimestampToDatetime(timestamp.seconds)
      : "";
    const { url1, url2, url3, url4 } = await getImageUrlFromStorage(
      fileName1,
      fileName2,
      fileName3,
      fileName4
    );
    const imageElement1 = `<img src="${url1}"/>`;
    const imageElement2 = `<img src="${url2}"/>`;
    const imageElement3 = `<img src="${url3}"/>`;
    const imageElement4 = `<img src="${url4}"/>`;
    console.log(imageElement1);
    artist.push(`<p>　${document.data.name}　さんの作品一覧</p>`);
    htmlElements.push(`
          <a class="blogBox" id="${document.id}" href="work.html?id=${document.id}">
                  <div class="titleArea">
                    <p>投稿者　${document.data.name}　さん</p>
                    </div>
                    <div class="contentArea">
                    <div class="pictureArea pictureArea-top">
                      ${imageElement1}
                    </div>
                    <div class="pictureArea pictureArea-bottom">
                    ${imageElement2}
                    </div>
                    <div class="pictureArea pictureArea-bottom">
                    ${imageElement3}
                    </div>
                    <div class="pictureArea pictureArea-bottom">
                    ${imageElement4}
                    </div>
                  </div>
                  <div class="textDataArea">
                    <p id="docDateText">${document.data.title}</p>
                    <p id="docDateText">${document.data.workComment}</p>
                  </div>
                </a>
                    `);
    console.log(`${document.id}`);
  }
  $("#output").html(htmlElements);
});
$(document).ready(function () {
  $("#go-back").click(function () {
    window.location.href = "tokoform.html";
  });
});

// $(document).ready(function () {
//   $(".blogBox").click(function () {
//     console.log("click!");

//     // const image1 = $(this).find(".pictureArea:eq(0) img").attr("src");
//     // const image2 = $(this).find(".pictureArea:eq(1) img").attr("src");
//     // const image3 = $(this).find(".pictureArea:eq(2) img").attr("src");
//     // const image4 = $(this).find(".pictureArea:eq(3) img").attr("src");
//     // openArtwork(image1, image2, image3, image4);
//     // console.log(image1, image2, image3, image4);
//   });
// });

// function openArtwork(image1, image2, image3, image4) {
//   const url = `artwork.html?image1=${encodeURIComponent(
//     image1
//   )}&image2=${encodeURIComponent(image2)}&image3=${encodeURIComponent(
//     image3
//   )}&image4=${encodeURIComponent(image4)}`;
//   window.open(url, "_blank");
// }
