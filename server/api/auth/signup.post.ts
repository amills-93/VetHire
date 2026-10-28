import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event)

  if (!email || !password || !name) {
    throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' })
  }

  const prisma = usePrisma()
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
    select: { id: true, email: true, name: true, createdAt: true }
  })

  return { user }
})
