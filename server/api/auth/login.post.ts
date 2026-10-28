import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const user = await usePrisma().user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, getJwtSecret(), { expiresIn: '1h' })
  return { token }
})
