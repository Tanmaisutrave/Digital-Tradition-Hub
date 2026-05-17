import 'dotenv/config'
import connectDB from './config/db.js'
import User from './models/User.js'

const ADMIN_EMAIL = 'admin@digitaltradition.com'
const ADMIN_PASSWORD = 'Admin@123'
const ADMIN_NAME = 'Admin User'

const createAdmin = async () => {
  await connectDB()

  const existing = await User.findOne({ email: ADMIN_EMAIL })

  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin'
      await existing.save()
      console.log('✅ Existing user promoted to admin!')
    } else {
      console.log('✅ Admin account already exists.')
    }
    console.log('\n─────────────────────────────────')
    console.log('  Email   :', ADMIN_EMAIL)
    console.log('  Password:', ADMIN_PASSWORD)
    console.log('  Role    : admin')
    console.log('─────────────────────────────────\n')
    process.exit(0)
  }

  const admin = await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
  })

  console.log('\n✅ Admin account created successfully!')
  console.log('\n─────────────────────────────────')
  console.log('  Email   :', ADMIN_EMAIL)
  console.log('  Password:', ADMIN_PASSWORD)
  console.log('  Role    : admin')
  console.log('─────────────────────────────────')
  console.log('\nGo to http://localhost:5173/login and use these credentials.')
  console.log('After login, visit http://localhost:5173/admin\n')

  process.exit(0)
}

createAdmin().catch(err => {
  console.error('Failed to create admin:', err.message)
  process.exit(1)
})
