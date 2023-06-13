let videos = [
  {
    title : "First Video",
    rating : 5,
    comments : 2,
    createdAt : "2 minutes ago",
    views:59,
    id:1
  },
  {
    title : "Second Video",
    rating : 5,
    comments : 2,
    createdAt : "2 minutes ago",
    views:59,
    id:2
  },
  {
    title : "Third Video",
    rating : 5,
    comments : 2,
    createdAt : "2 minutes ago",
    views:59,
    id:3
  },
  
];

export const trending = (req,res) => {
  return res.render("home",{pageTitle:"Home",videos});
}; //pageTitle 템플릿 변수 전달
''
export const watch = (req, res) => {
  const {id} = req.params;
  const video = videos[id - 1];
  return res.render("Watch",{ pageTitle :`Watching ${video.title}`,video});
};
export const getEdit = (req, res) => {
  const {id} = req.params;
  const video = videos[id - 1];
  return res.render("edit",{pageTitle:`Editing : ${video.title}`,video})
};

export const postEdit = (req, res) => {
  // const id = req.params.id
  const {id} = req.params;
  const {title} =req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`); 
};

export const getUpload = (req, res) => { 
  return res.render("upload",{pageTitle : "Upload Video"});
};

// req.body를 통해 input에 있는 내용을 받아올 수 있음
export const postUpload = (req, res) => {
  const {title} = req.body;
  const newVideo = {
    title,
    rating : 0,
    comments : 0,
    createdAt : "Just now",
    view : 0,
    id : videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};