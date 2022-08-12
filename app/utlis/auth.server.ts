
// https://www.youtube.com/watch?v=vR33ZRJekHk @ 27- 45
import { prisma } from './prisma.server'
import { RegisterForm, LoginForm } from './types.server'
import { createUser } from './users.server'
import bcrypt from 'bcryptjs'
import { json, createCookieSessionStorage, redirect } from '@remix-run/node'

const secret = process.env.SESSION_SECRET

if ( !secret){
  throw new Error('Session_secret is not set')
}

// set up the cookie storage @ 41min
const storage = createCookieSessionStorage({
  cookie: {
    name: 'splinter-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [secret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})


export const register = async(form: RegisterForm) => {

  //returns a boolen if user doesn't exist it returns zero otherwise a 1
  const exists = await prisma.user.count({ where: { email: form.email } })
  if (exists) {
    return json(
      { error: `User already exists with that email` }, 
      { status: 400 }
    )
  }
  const newUser = await createUser(form)

  if (!newUser) {
    return json({ 
        error: `Something went wrong in the creation of the user`,
        fields: {email: form.email, password: form.password},
      }, 
     { status: 400 }
    )
  }
  //@
  return createUserSession(newUser.id, '/hive');
}

//38min login a pre existing user here redirect successful login to /hive
export const login = async (form: LoginForm) => {
  const user = await prisma.user.findUnique({
    where: {email: form.email }
  })

  if (!user || !await bcrypt.compare(form.password, user.password)) {
    return json({ 
      error: `incorrect login`,
      fields: {email: form.email, password: form.password},
    }, 
    { status: 400 })   
  } 
  return createUserSession(user.id, '/hive')
}



// create the user session and redirect to another page
export const createUserSession = async(
  userId: string, 
  redirectTo: string
  ) => {

    //@46 min
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}