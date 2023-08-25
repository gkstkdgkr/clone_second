const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelector(".delete__comment")

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
  deleteBtn.addEventListener("click", handleCommentDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }

  // string이 아니라 json string 이라는 것을 알려주기 위해 사용
  // data가 로드되는 것 뿐만 아니라 웹이 응답하는 것도 대기
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
const handleCommentDelete = async (event) => {
  event.preventDefault();
  const commentId = event.target.parentNode.dataset.id;
  const response = await fetch(`/api/comments/${commentId}`,{
    method: "DELETE",
  })
  if (response.status === 200) {
    event.target.parentNode.remove();
  }
}

// form 이 있을때도 있고(로그인) 없을 때도 있음(로그아웃)
if (form) {
  form.addEventListener("submit", handleSubmit);
}

