const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }

  // string이 아니라 json string 이라는 것을 알려주기 위해 사용
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  window.location.reload();
};

// form 이 있을때도 있고(로그인) 없을 때도 있음(로그아웃)
if (form) {
  form.addEventListener("submit", handleSubmit);
}
