import Video from "../models/Video";
import User from "../models/User";
// Video.find({})
//   .then((videos)=>{
//     console.log('videos',videos);
//   })
//   .catch((error)=>{
//     console.log('error',error);
//   })
// res.render('home', {pageTitle : `home`,videos:[]})
// console.log('hello');
// hello가 먼저 출력된 후 render과정을 거치고 video가 마지막에 출력됨(database검색이 끝나야 render가 실행됨) (Callback)
// await를 쓰지않으면 코드 순서대로 출력이 되지 않음
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" }); // db에서 불러옴
  return res.render("home", { pageTitle: `home`, videos });
}; //pageTitle 템플릿 변수 전달
// await를 씀으로써 db에게 데이터 받는 시간을 기다려줌
// async랑 세트로 씀(함수안에서만 사용)(promiss)
// try catch는 try를 실행하고 오류시 catch실행
export const watch = async (req, res) => {
  // const id = req.params.id
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(400).render("404", { pageTitle: "Video not found." });
  }
  return res.render("Watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user: { _id }, } = req.session
  const video = await Video.findById(id);
  if (!video) {
    return res.status(400).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/")
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

// 같은 render는 한번만 가능
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { user: { _id }, } = req.session
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/")
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

// req.body를 통해 input에 있는 내용을 받아올 수 있음
// const video = new Video({
//   // title : title,
//   // 왼쪽 title은 schema의 title // 오른쪽 title은 body의 req.body의 title
//   title,
//   description,
//   createAt:Date.now(),
//   hashtags : hashtags.split(",").map(word => `#${word}`),
//   meta: {
//     views : 0,
//     rating : 0,
//   },
// });
// await video.save(); // data가 db에 저장되는 시간을 기다림
// title : title,
// 왼쪽 title은 schema의 title // 오른쪽 title은 body의 req.body의 title
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)
    user.save()
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { user: { _id }, } = req.session
  const video = await Video.findById(id);
  if (!video) {
    return res.status(400).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/")
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
        // 입력된 keyword 검색 "i"는 대소문자 무시 ${keyword}
        //앞에 ^ 쓰면 keyword로 시작하는 제목 // 뒤에 $ 쓰면 keyword로 끝나는 제목
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
