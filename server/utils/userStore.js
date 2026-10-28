import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const USER_DB_PATH = join(process.cwd(), 'data', 'users.json')

export function loadUsers() {
  const data = readFileSync(USER_DB_PATH, 'utf-8')
  return JSON.parse(data).users
}

export function saveUsers(users) {
  const content = JSON.stringify({ users }, null, 2)
  writeFileSync(USER_DB_PATH, content, 'utf-8')
}

export function findUserByEmail(email) {
  const users = loadUsers()
  return users.find(u => u.email === email)
}

export function addUser(user) {
  const users = loadUsers()
  users.push(user)
  saveUsers(users)
  return user
}
