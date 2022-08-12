// https://www.youtube.com/watch?v=vR33ZRJekHk @ 32- 39:35
// this file creates a user after the authentication file @ auth.server.ts

import { prisma } from './prisma.server'
import type { RegisterForm } from './types.server'
import bcrypt from 'bcryptjs'

export const createUser = async (user: RegisterForm) => {

  //10 rounds of encrypt salting
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
    },
  })
  return { id: newUser.id, email: user.email }
}