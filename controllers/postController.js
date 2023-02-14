import {PrismaClient} from 'prisma/prisma-client/index.js';

//  ------------------------------------------------------------

const {post, user} = new PrismaClient();

//  create post controller
const createPost = async (req, res) => {
  const {user_id, title, content} = req.body;

  //  req.body충족안될때
  if (!title || !post || !user_id) {
    return res.status(400).json({msg: 'please provide all values'});
  }

  //  user 가 이미 있는 유저인지 없는 유저인지 확인
  const userExists = await user.findUnique({
    where: {
      id: user_id,
    },
  });

  //  유저가 없으면 에러보내기
  if (!userExists) {
    return res.status(400).json({msg: 'user not found'});
  }

  //  다 되면 newPost 만들어서 보내기
  const newPost = await post.create({
    data: {
      title,
      post: content,
      user_id,
    },
  });

  //  res 요청
  res.json(newPost);
};

//  get single post controller
const getSinglePost = async (req, res) => {
  //  나의 Url창에서 id추출
  const {id} = req.params;

  //  db에서 해당 id와 관련된 posts 찾기
  const posts = await post.findMany({
    where: {
      user_id: parseInt(id),
    },
    select: {
      title: true,
      created_at: true,
      post: true,
      user: true,
    },
  });

  //  만약 없음 에러
  if (posts.length === 0) {
    return res.status(404).json({msg: `not found this post id ${id} `});
  }

  //  있으면 res 요청
  res.json(posts);
};

//  export controllers
export {createPost, getSinglePost};
