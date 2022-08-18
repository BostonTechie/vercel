import { prisma } from './prisma.server'
import {QueryForm } from './types.server'



export const login = async (form: QueryForm) => {
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