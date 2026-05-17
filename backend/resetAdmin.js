import 'dotenv/config'
import connectDB from './config/db.js'
import User from './models/User.js'

const reset = async () => {
  await connectDB()

  const user = await User.findOne({ email: 'admin@digitaltradition.com' }).select('+password')
  if (!user) {
    console.log('❌ Admin not found. Run: npm run create:admin')
    process.exit(1)
  }

  user.password = 'Admin@123'
  user.role = 'admin'
  await user.save() // triggers bcrypt hash via pre-save hook

  console.log('\n✅ Admin password reset successfully!')
  console.log('─────────────────────────────────')
  console.log('  Email   : admin@digitaltradition.com')
  console.log('  Password: Admin@123')
  console.log('─────────────────────────────────\n')
  process.exit(0)
}

reset().catch(err => {
  console.error('Reset failed:', err.message)
  process.exit(1)
})
