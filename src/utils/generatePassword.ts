export function generatePassword() {
    const length = 8
    const chars = 'abcdefghijklmnopqrstuvwxyz123456789!@#$'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
  }