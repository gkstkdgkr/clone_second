"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.deleteVideo = exports.postUpload = exports.getUpload = exports.postEdit = exports.getEdit = exports.watch = exports.home = void 0;

var _Video = _interopRequireDefault(require("../models/Video"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var home = function home(req, res) {
  var videos;
  return regeneratorRuntime.async(function home$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Video["default"].find({}).sort({
            createdAt: "desc"
          }));

        case 2:
          videos = _context.sent;
          return _context.abrupt("return", res.render("home", {
            pageTitle: "home",
            videos: videos
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; //pageTitle 템플릿 변수 전달
// await를 씀으로써 db에게 데이터 받는 시간을 기다려줌
// async랑 세트로 씀(함수안에서만 사용)(promiss)
// try catch는 try를 실행하고 오류시 catch실행


exports.home = home;

var watch = function watch(req, res) {
  var id, video;
  return regeneratorRuntime.async(function watch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // const id = req.params.id
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Video["default"].findById(id).populate("owner"));

        case 3:
          video = _context2.sent;

          if (video) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).render("404", {
            pageTitle: "Video not found."
          }));

        case 6:
          return _context2.abrupt("return", res.render("Watch", {
            pageTitle: video.title,
            video: video
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.watch = watch;

var getEdit = function getEdit(req, res) {
  var id, _id, video;

  return regeneratorRuntime.async(function getEdit$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _id = req.session.user._id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_Video["default"].findById(id));

        case 4:
          video = _context3.sent;

          if (video) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).render("404", {
            pageTitle: "Video not found."
          }));

        case 7:
          if (!(String(video.owner) !== String(_id))) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(403).redirect("/"));

        case 9:
          return _context3.abrupt("return", res.render("edit", {
            pageTitle: "Edit: ".concat(video.title),
            video: video
          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // 같은 render는 한번만 가능


exports.getEdit = getEdit;

var postEdit = function postEdit(req, res) {
  var id, _id, _req$body, title, description, hashtags, video;

  return regeneratorRuntime.async(function postEdit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _id = req.session.user._id;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_Video["default"].exists({
            _id: id
          }));

        case 5:
          video = _context4.sent;

          if (video) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.render("404", {
            pageTitle: "Video not found."
          }));

        case 8:
          if (!(String(video.owner) !== String(_id))) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(403).redirect("/"));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(_Video["default"].findByIdAndUpdate(id, {
            title: title,
            description: description,
            hashtags: _Video["default"].formatHashtags(hashtags)
          }));

        case 12:
          return _context4.abrupt("return", res.redirect("/videos/".concat(id)));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.postEdit = postEdit;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload Video"
  });
}; // req.body를 통해 input에 있는 내용을 받아올 수 있음
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


exports.getUpload = getUpload;

var postUpload = function postUpload(req, res) {
  var _id, fileUrl, _req$body2, title, description, hashtags, newVideo, user;

  return regeneratorRuntime.async(function postUpload$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _id = req.session.user._id;
          fileUrl = req.file.path;
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, hashtags = _req$body2.hashtags;
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(_Video["default"].create({
            title: title,
            description: description,
            fileUrl: fileUrl,
            owner: _id,
            hashtags: _Video["default"].formatHashtags(hashtags)
          }));

        case 6:
          newVideo = _context5.sent;
          _context5.next = 9;
          return regeneratorRuntime.awrap(_User["default"].findById(_id));

        case 9:
          user = _context5.sent;
          user.videos.push(newVideo._id);
          user.save();
          return _context5.abrupt("return", res.redirect("/"));

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](3);
          return _context5.abrupt("return", res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: _context5.t0._message
          }));

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 15]]);
};

exports.postUpload = postUpload;

var deleteVideo = function deleteVideo(req, res) {
  var id, _id, video;

  return regeneratorRuntime.async(function deleteVideo$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _id = req.session.user._id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_Video["default"].findById(id));

        case 4:
          video = _context6.sent;

          if (video) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(400).render("404", {
            pageTitle: "Video not found."
          }));

        case 7:
          if (!(String(video.owner) !== String(_id))) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(403).redirect("/"));

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(_Video["default"].findByIdAndDelete(id));

        case 11:
          return _context6.abrupt("return", res.redirect("/"));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.deleteVideo = deleteVideo;

var search = function search(req, res) {
  var keyword, videos;
  return regeneratorRuntime.async(function search$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          keyword = req.query.keyword;
          videos = [];

          if (!keyword) {
            _context7.next = 6;
            break;
          }

          _context7.next = 5;
          return regeneratorRuntime.awrap(_Video["default"].find({
            title: {
              $regex: new RegExp("".concat(keyword), "i") // 입력된 keyword 검색 "i"는 대소문자 무시 ${keyword}
              //앞에 ^ 쓰면 keyword로 시작하는 제목 // 뒤에 $ 쓰면 keyword로 끝나는 제목

            }
          }));

        case 5:
          videos = _context7.sent;

        case 6:
          return _context7.abrupt("return", res.render("search", {
            pageTitle: "Search",
            videos: videos
          }));

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.search = search;