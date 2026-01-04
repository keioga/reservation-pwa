window.onload = function() {
  const savedId = localStorage.getItem("memberId");
  const savedName = localStorage.getItem("userName");

  if (savedId && savedName) {
    // 記憶があれば：予約画面へ
    showReservationPage(savedId, savedName);
  } else {
    // 記憶がなければ：認証画面を表示
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("reserve-section").style.display = "none";
    
  }
};


function login() {
  const name = document.getElementById("input_name").value;
  const birth = document.getElementById("input_birth").value;

  fetch("https://script.google.com/macros/s/AKfycbz49vcGe_8hmXS6uvghjFszJnSrmeTCauYs__CkQdbauV0Em_co_R-Cm6p0DWPAtlB8YA/exec", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      type: "AUTH",
      name: name,
      birth: birth
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === "SUCCESS") {
      // ローカルストレージに保存
      localStorage.setItem("memberId", res.memberId);
      localStorage.setItem("userName", res.userName);
      
      // 画面切り替え
      showReservationPage(res.memberId, res.userName);
    } else {
      alert(res.message);
    }
  });
}

function logout() {
  localStorage.clear(); // 保存情報を全削除
  location.reload();    // ページを再読み込みして認証画面へ
}

function showReservationPage(id, name) {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("reserve-section").style.display = "block";
  document.getElementById("welcome-msg").innerText = name + "様、こんにちは！";
}