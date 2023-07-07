import Video from "../models/Video";
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
export const home = async (req,res) => {
  try{
    const videos = await Video.find({}); // db에서 불러옴
    return res.render('home', {pageTitle : `home`,videos})  
  }
  catch(error){
    return res.render("error",error)
  }
}; //pageTitle 템플릿 변수 전달
// await를 씀으로써 db에게 데이터 받는 시간을 기다려줌
// async랑 세트로 씀(함수안에서만 사용)(promiss)
// try catch는 try를 실행하고 오류시 catch실행
export const watch = (req, res) => {
  const {id} = req.params;
  return res.render("Watch",{ pageTitle :`Watching`});
};
export const getEdit = (req, res) => {
  const {id} = req.params;
  return res.render("edit",{pageTitle:`Editing`})
};
// 같은 render는 한번만 가능
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
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
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
  try{
    await Video.create({
      // title : title,
      // 왼쪽 title은 schema의 title // 오른쪽 title은 body의 req.body의 title
      title,
      description,
      hashtags : hashtags.split(",").map(word => `#${word}`),    
    });  
    return res.redirect("/");
  }
  catch(error){
    return res.render("upload",{
      pageTitle : "Upload Video", 
      errorMessage: error._message,});
  }
};