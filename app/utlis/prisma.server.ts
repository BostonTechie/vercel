// app/utils/prisma.server.ts
//https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8#the-authentication-flow
// https://www.youtube.com/watch?v=vR33ZRJekHk @ 27- 39:35


import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare global {
  var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
  prisma.$connect()
} else {

  //if in devlopment only connect once to not use up your pool
  if (!global.__db) {
    global.__db = new PrismaClient()
    global.__db.$connect()
  }
  prisma = global.__db
}

export { prisma }