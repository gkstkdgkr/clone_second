import Video from "../models/Video";

export const home = (req,res) => {
  Video.find({})
    .then((videos)=>{
      console.log('videos',videos);
    })
    .catch((error)=>{
      console.log('error',error);
    })
  res.render('home', {pageTitle : `home`,videos:[]})
  console.log('hello');
}; //pageTitle 템플릿 변수 전달

export const watch = (req, res) => {
  const {id} = req.params;
  return res.render("Watch",{ pageTitle :`Watching`});
};
export const getEdit = (req, res) => {
  const {id} = req.params;
  return res.render("edit",{pageTitle:`Editing`})
};

export const postEdit = (req, res) => {
  // const id = req.params.id
  const {id} = req.params;
  const {title} =req.body;
  return res.redirect(`/videos/${id}`); 
};

export const getUpload = (req, res) => { 
  return res.render("upload",{pageTitle : "Upload Video"});
};

// req.body를 통해 input에 있는 내용을 받아올 수 있음
export const postUpload = (req, res) => {
  const {title} = req.body;
  return res.redirect("/");
};