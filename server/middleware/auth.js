// server/middleware/auth.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'POST') {
    const { email, password, name } = await readBody(event);

    if (event.path === '/api/auth/signup') {
      // Validate email and password
      if (!email || !password || !name) {
        throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in the database
      try {
        const user = await prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
          },
        });
        return { user };
      } catch (error) {
        if (error.code === 'P2002') {
          throw createError({ statusCode: 409, statusMessage: 'Email already exists' });
        }
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
      }
    }

    if (event.path === '/api/auth/login') {
      // Validate email and password
      if (!email || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Email and password are required' });
      }

      // Find user by email
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
        return { token };
      } catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
      }
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
