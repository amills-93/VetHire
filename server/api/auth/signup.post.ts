import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUserByEmail, addUser } from '../utils/userStore'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event)

  if (!email || !password || !name) {
    throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' })
  }

  const existing = findUserByEmail(email)
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = addUser({
    id: Date.now().toString(),
    email,
    name,
    password: hashedPassword
  })

  return { user }
})