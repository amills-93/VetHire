import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event)

  if (!email || !password || !name) {
    throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    })
    return { user }
  } catch (error) {
    if (error.code === 'P2002') {
      throw createError({ statusCode: 409, statusMessage: 'Email already exists' })
    }
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})