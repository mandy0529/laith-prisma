import {PrismaClient} from 'prisma/prisma-client/index.js';

// -------------------------------------------

const {user} = new PrismaClient();

//  1. get user controller
const getUsers = async (req, res) => {
  //  users 찾기
  const users = await user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });

  //  res 요청
  res.json({users});
};

// 2. create user controller
const createUser = async (req, res) => {
  const {username} = req.body;

  //  새로 만들유저가 이미 있는지 없는지 확인
  const userExists = await user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      posts: true,
    },
  });

  //  유저가 이미 존재한다면 못만든다고 에러
  if (userExists) {
    return res.status(400).json({msg: 'user already exists'});
  }

  //  새유저 만드리
  const newUser = await user.create({
    data: {
      username,
    },
  });

  //  res 요청
  res.json(newUser);
};

//  export controllers
export {getUsers, createUser};
