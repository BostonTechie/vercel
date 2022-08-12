// app/utils/auth.server.ts
// https://www.youtube.com/watch?v=vR33ZRJekHk @ 39:35

import { json, createCookieSessionStorage, redirect } from '@remix-run/node'
import type { RegisterForm, LoginForm } from './types.server'
import { prisma } from './prisma.server'
import { createUser } from './users.server'
import bcrypt from 'bcryptjs'


//throw an error if you don't set up a session secret within .env @ 42 min
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

// set up the cookie storage 
const storage = createCookieSessionStorage({
  cookie: {
    name: 'splinter-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

//register a new user here redirect to /hive the table that shows data
export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({ where: { email: user.email } })
  if (exists) {
    return json({ error: `User already exists with that email` }, { status: 400 })
  }


  const newUser = await createUser(user)
  if (!newUser) {
    return json(
     {
       error: `Something went wrong trying to create a new user.`,
       fields: { email: user.email, password: user.password },
      },
      { status: 400 },
    )
  }

  return createUserSession(newUser.id, '/hive')
}

//login a pre existing user here redirect successful login to /hive
export const login = async(form: LoginForm) => {
    const user = await prisma.user.findUnique({
        where: {email: form.email},
    })

    if(!user || !(await bcrypt.compare(form.password, user.password))){
        return json({error: "incorrect loging"}, {status: 400})
    }

    return createUserSession(user.id, "/hive")
}

// create the user session and redirect to another page
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}