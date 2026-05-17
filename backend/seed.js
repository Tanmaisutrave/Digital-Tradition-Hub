import 'dotenv/config'
import mongoose from 'mongoose'
import Festival from './models/Festival.js'
import connectDB from './config/db.js'

const festivals = [
  {
    title: 'Diwali',
    region: 'North India',
    category: 'Festival',
    festivalDate: new Date('2025-10-20'),
    images: ['https://kirkleeslocaltv.com/wp-content/uploads/2021/11/pexels-udayaditya-barua-40785161-1024x682.jpg'],
    tagline: 'The Festival of Lights that fills every heart with joy and every home with warmth.',
    description: 'The festival of lights celebrated with diyas, fireworks, sweets, and prayers to Goddess Lakshmi across India.',
    color: 'from-orange-400 to-yellow-300',
    status: 'published',
    story: `Long, long ago in the kingdom of Ayodhya, a beloved prince named Rama was sent into exile for fourteen years by his own father, bound by an old promise. With his devoted wife Sita and loyal brother Lakshmana, Rama wandered the forests with grace and courage.\n\nBut darkness came — the demon king Ravana kidnapped Sita and carried her away to his island kingdom of Lanka. Rama, heartbroken but determined, gathered an army of brave monkeys led by the mighty Hanuman. Together they crossed the ocean, fought a great battle, and Rama defeated Ravana, rescuing Sita.\n\nWhen Rama, Sita, and Lakshmana finally returned home to Ayodhya after fourteen long years, the entire kingdom erupted in celebration. The people lit thousands of oil lamps — diyas — to welcome their beloved prince home, turning the darkest night of the year into a sea of golden light.\n\nAnd so every year, we light our diyas to remember that light always conquers darkness, and good always triumphs over evil.`,
    whyCelebrate: 'Diwali reminds us that no matter how dark things get, light will always find a way. It celebrates the victory of knowledge over ignorance, hope over despair, and love over hatred. Families come together, forgive old grudges, and begin anew.',
    traditions: [
      'Lighting clay diyas and candles around the home',
      'Decorating with colorful rangoli at the entrance',
      'Bursting firecrackers and sparklers',
      'Exchanging sweets and gifts with family and neighbors',
      'Performing Lakshmi Puja for wealth and prosperity',
      'Wearing new clothes and visiting relatives',
    ],
    funFacts: [
      { fact: 'Diwali spans five days, each with its own name and significance.', color: 'bg-orange-50 border-orange-200' },
      { fact: 'The word "Diwali" comes from Sanskrit "Deepavali" meaning "row of lights".', color: 'bg-yellow-50 border-yellow-200' },
      { fact: 'Over 1 billion people across the world celebrate Diwali every year.', color: 'bg-amber-50 border-amber-200' },
      { fact: 'In Jainism, Diwali marks the spiritual awakening (nirvana) of Lord Mahavira.', color: 'bg-orange-50 border-orange-200' },
    ],
    quiz: [
      { question: 'What does the word "Diwali" mean?', options: ['Row of lights', 'Festival of colors', 'Harvest celebration', 'Victory dance'], answer: 0 },
      { question: 'Which goddess is worshipped on the main night of Diwali?', options: ['Saraswati', 'Durga', 'Lakshmi', 'Parvati'], answer: 2 },
    ],
  },
  {
    title: 'Holi',
    region: 'North India',
    category: 'Festival',
    festivalDate: new Date('2025-03-14'),
    images: ['https://i.pinimg.com/originals/cb/bc/2e/cbbc2e31f6682b2289fb2e95f9ccd278.jpg'],
    tagline: 'Where every color tells a story and every splash is a celebration of life.',
    description: 'The vibrant festival of colors marking the arrival of spring and the triumph of good over evil.',
    color: 'from-pink-400 to-purple-300',
    status: 'published',
    story: `Once upon a time, there was a mighty king named Hiranyakashipu who believed he was a god and demanded everyone worship him. But his own son, young Prahlada, refused — his heart belonged only to Lord Vishnu.\n\nEnraged, the king tried everything to kill his devoted son. He threw Prahlada off cliffs, had elephants trample him, and put him in a pit of snakes — but nothing worked. Finally, the king's sister Holika, who had a magical cloak that made her immune to fire, sat in a blazing pyre with Prahlada in her lap, certain the boy would burn.\n\nBut something miraculous happened. The divine wind swept Holika's cloak onto Prahlada, and she burned while the boy emerged unharmed, singing praises of Vishnu.\n\nThe next morning, people celebrated by smearing each other with colored powders — the bright pinks, yellows, and greens of spring flowers — dancing and laughing in the streets. That bonfire the night before? We still light it every Holi eve, called Holika Dahan, to remember that devotion and goodness can never be destroyed.`,
    whyCelebrate: 'Holi celebrates the arrival of spring, the end of winter, and the eternal truth that good always defeats evil. It is also a festival of forgiveness — people patch up old quarrels and start fresh, united by color and laughter.',
    traditions: [
      'Holika Dahan — lighting a bonfire the night before',
      'Playing with dry and wet colors (gulal)',
      'Drenching each other with water guns and balloons',
      'Singing and dancing to folk music',
      'Drinking thandai (a special spiced milk drink)',
      'Visiting friends and sharing sweets like gujiya',
    ],
    funFacts: [
      { fact: 'Holi is celebrated on the full moon day of the Hindu month Phalguna.', color: 'bg-pink-50 border-pink-200' },
      { fact: 'Traditional Holi colors were made from flowers like tesu and marigold.', color: 'bg-purple-50 border-purple-200' },
      { fact: 'Mathura and Vrindavan celebrate Holi for over 16 days straight.', color: 'bg-pink-50 border-pink-200' },
      { fact: 'Holi is now celebrated in over 40 countries around the world.', color: 'bg-fuchsia-50 border-fuchsia-200' },
    ],
    quiz: [
      { question: 'What is the bonfire lit on the eve of Holi called?', options: ['Diya Dahan', 'Holika Dahan', 'Agni Puja', 'Rang Ratri'], answer: 1 },
      { question: "Which demon king's son was saved by Lord Vishnu during Holi?", options: ['Ravana', 'Kansa', 'Prahlada', 'Hiranyakashipu'], answer: 2 },
    ],
  },
  {
    title: 'Pongal',
    region: 'South India',
    category: 'Harvest',
    festivalDate: new Date('2026-01-14'),
    images: ['https://cdn.cdnparenting.com/articles/2019/03/19151828/2240500895.webp'],
    tagline: 'A harvest of gratitude — thanking the sun, the rain, and the earth.',
    description: 'A four-day harvest festival of gratitude celebrated with sugarcane, rice dishes, and folk dances in Tamil Nadu.',
    color: 'from-green-400 to-teal-300',
    status: 'published',
    story: `In the fertile fields of Tamil Nadu, when the golden paddy sways in the winter breeze and the harvest is finally ready, farmers look up at the sky and feel a deep, quiet gratitude.\n\nPongal is their way of saying thank you — to Surya, the Sun God, whose warmth made the crops grow; to Indra, the rain god, whose showers fed the earth; and to the cattle who worked tirelessly in the fields.\n\nOn the main day, families gather around a clay pot in the courtyard. Fresh rice, jaggery, and milk are cooked together over a wood fire. As the sweet mixture boils and overflows — "Pongal-o-Pongal!" everyone shouts with joy, because an overflowing pot means abundance and prosperity for the year ahead.\n\nThe cattle are bathed, decorated with garlands and painted horns, and honored with a special ceremony called Mattu Pongal. It is a festival that reminds us: the earth gives, and we must give thanks.`,
    whyCelebrate: "Pongal is a celebration of gratitude and abundance. It honors the farmers, the sun, the rain, and the cattle that make life possible. It teaches us to be thankful for nature's gifts and to live in harmony with the earth.",
    traditions: [
      'Cooking the traditional Pongal dish in a clay pot outdoors',
      'Drawing colorful kolam (rangoli) patterns at the entrance',
      'Decorating cattle and performing Mattu Pongal',
      'Jallikattu — the traditional bull-taming sport',
      'Visiting family and exchanging sugarcane and sweets',
      'Burning old household items to symbolize new beginnings',
    ],
    funFacts: [
      { fact: 'Pongal is a four-day festival — Bhogi, Thai Pongal, Mattu Pongal, and Kaanum Pongal.', color: 'bg-green-50 border-green-200' },
      { fact: '"Pongal" means "to boil over" — symbolizing abundance and prosperity.', color: 'bg-teal-50 border-teal-200' },
      { fact: "The festival marks the sun's northward journey called Uttarayan.", color: 'bg-green-50 border-green-200' },
      { fact: 'Pongal has been celebrated for over 2,000 years in Tamil Nadu.', color: 'bg-emerald-50 border-emerald-200' },
    ],
    quiz: [
      { question: 'What does the word "Pongal" mean?', options: ['To boil over', 'Harvest time', 'Sun festival', 'Sweet rice'], answer: 0 },
      { question: 'Which day of Pongal honors cattle?', options: ['Bhogi Pongal', 'Thai Pongal', 'Mattu Pongal', 'Kaanum Pongal'], answer: 2 },
    ],
  },
  {
    title: 'Ganesh Chaturthi',
    region: 'West India',
    category: 'Festival',
    festivalDate: new Date('2025-08-27'),
    images: ['https://tse3.mm.bing.net/th/id/OIP.qlowXsi9vozhV7pwPqhSqgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'],
    tagline: 'Welcome the remover of obstacles into your home and heart.',
    description: 'A grand celebration honoring Lord Ganesha with elaborate processions, music, and immersion ceremonies.',
    color: 'from-yellow-400 to-orange-300',
    status: 'published',
    story: '',
    whyCelebrate: 'Ganesh Chaturthi celebrates the birth of Lord Ganesha, the elephant-headed god of wisdom and new beginnings. People invite Ganesha into their homes to bless them with success and remove obstacles from their path.',
    traditions: [
      'Installing beautifully crafted Ganesha idols at home and in pandals',
      "Offering modak (sweet dumplings) — Ganesha's favorite",
      'Daily prayers, aarti, and devotional singing for 10 days',
      'Grand processions through the streets with music and dance',
      'Visarjan — immersing the idol in water on the final day',
    ],
    funFacts: [
      { fact: 'The festival lasts 10 days, ending with the grand Visarjan procession.', color: 'bg-yellow-50 border-yellow-200' },
      { fact: "Mumbai's Lalbaugcha Raja pandal attracts over 1.5 million visitors each year.", color: 'bg-orange-50 border-orange-200' },
      { fact: "Modak is Ganesha's favorite sweet — over 21 types are offered during the festival.", color: 'bg-yellow-50 border-yellow-200' },
      { fact: 'Bal Gangadhar Tilak popularized the public celebration of Ganesh Chaturthi in 1893.', color: 'bg-amber-50 border-amber-200' },
    ],
    quiz: [
      { question: "What is Ganesha's favorite sweet offered during the festival?", options: ['Ladoo', 'Modak', 'Barfi', 'Halwa'], answer: 1 },
      { question: 'What is the immersion of the Ganesha idol called?', options: ['Puja', 'Aarti', 'Visarjan', 'Archana'], answer: 2 },
    ],
  },
  {
    title: 'Navratri',
    region: 'West India',
    category: 'Festival',
    festivalDate: new Date('2025-09-22'),
    images: ['https://tse4.mm.bing.net/th/id/OIP.zjJzRIDn7yaCJKW1fjOD9wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'],
    tagline: 'Nine nights of devotion, dance, and the divine feminine energy.',
    description: 'Nine nights of devotion, Garba dance, and music honoring the nine forms of Goddess Durga.',
    color: 'from-red-400 to-orange-300',
    status: 'published',
    story: '',
    whyCelebrate: 'Navratri honors the nine forms of Goddess Durga and celebrates the victory of divine feminine energy over evil. Each night is dedicated to a different form of the goddess, and the festival culminates in Dussehra — the day Rama defeated Ravana.',
    traditions: [
      'Garba and Dandiya Raas — traditional circular dances',
      'Fasting and special sattvic food during the nine days',
      'Setting up Golu (doll displays) in South India',
      'Wearing a different color each day of Navratri',
      'Kanya Puja — honoring young girls as forms of the goddess',
    ],
    funFacts: [
      { fact: 'Navratri occurs four times a year, but the autumn one is most celebrated.', color: 'bg-red-50 border-red-200' },
      { fact: 'Each of the nine days is associated with a specific color to wear.', color: 'bg-orange-50 border-orange-200' },
      { fact: "Gujarat's Navratri Garba is recognized by UNESCO as Intangible Cultural Heritage.", color: 'bg-red-50 border-red-200' },
      { fact: 'The word "Navratri" means "nine nights" in Sanskrit.', color: 'bg-amber-50 border-amber-200' },
    ],
    quiz: [
      { question: 'What does "Navratri" mean in Sanskrit?', options: ['Nine days', 'Nine nights', 'Nine goddesses', 'Nine colors'], answer: 1 },
      { question: 'Which dance form is most associated with Navratri in Gujarat?', options: ['Bharatanatyam', 'Kathak', 'Garba', 'Odissi'], answer: 2 },
    ],
  },
  {
    title: 'Durga Puja',
    region: 'East India',
    category: 'Festival',
    festivalDate: new Date('2025-09-29'),
    images: ['https://tse1.mm.bing.net/th/id/OIP.rAQh_4iU-Qc23NbK78JLCgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3'],
    tagline: 'Five days of art, devotion, and the goddess who conquers all evil.',
    description: 'A spectacular five-day festival in West Bengal celebrating Goddess Durga with artistic pandals and cultural events.',
    color: 'from-amber-400 to-red-300',
    status: 'published',
    story: '',
    whyCelebrate: 'Durga Puja celebrates the victory of Goddess Durga over the buffalo demon Mahishasura. It is a time of homecoming — the goddess visits her earthly home for five days, and the entire community comes alive with art, music, and devotion.',
    traditions: [
      'Creating elaborate themed pandals (temporary temples)',
      'Dhunuchi dance — dancing with incense burners',
      'Sindoor Khela — married women apply vermillion on the last day',
      'Dhak drumming — the iconic sound of Durga Puja',
      'Immersion of the goddess idol on Vijaya Dashami',
    ],
    funFacts: [
      { fact: "Kolkata's Durga Puja pandals are judged like an art competition every year.", color: 'bg-amber-50 border-amber-200' },
      { fact: 'UNESCO inscribed Durga Puja on its Intangible Cultural Heritage list in 2021.', color: 'bg-red-50 border-red-200' },
      { fact: 'Over 2,500 community pandals are set up in Kolkata alone each year.', color: 'bg-orange-50 border-orange-200' },
      { fact: 'The festival is called "Sharodotsav" meaning autumn festival in Bengali.', color: 'bg-amber-50 border-amber-200' },
    ],
    quiz: [
      { question: 'Which demon did Goddess Durga defeat according to mythology?', options: ['Ravana', 'Mahishasura', 'Hiranyakashipu', 'Kansa'], answer: 1 },
      { question: 'What is the iconic drum played during Durga Puja called?', options: ['Tabla', 'Mridangam', 'Dhak', 'Dholak'], answer: 2 },
    ],
  },
  {
    title: 'Onam',
    region: 'South India',
    category: 'Harvest',
    festivalDate: new Date('2025-09-05'),
    images: ['https://c8.alamy.com/comp/2G95K41/south-indian-kerala-festival-happy-onam-greetings-background-vector-illustration-design-2G95K41.jpg'],
    tagline: 'When a beloved king returns, Kerala blooms with flowers and joy.',
    description: "Kerala's harvest festival celebrated with Pookalam flower carpets, boat races, and the grand Onam Sadhya feast.",
    color: 'from-emerald-400 to-green-300',
    status: 'published',
    story: '',
    whyCelebrate: 'Onam celebrates the annual homecoming of the legendary King Mahabali, whose reign was said to be a golden age of equality and prosperity. The people of Kerala welcome him back with flowers, feasts, and festivities.',
    traditions: [
      'Pookalam — creating intricate flower carpet designs',
      'Onam Sadhya — a grand feast of 26+ dishes on a banana leaf',
      'Vallam Kali — the famous snake boat races',
      'Thiruvathira Kali — traditional dance performed by women',
      'Wearing traditional Kerala white and gold attire',
    ],
    funFacts: [
      { fact: 'The Onam Sadhya feast can have up to 26 different dishes served on a banana leaf.', color: 'bg-green-50 border-green-200' },
      { fact: 'The Nehru Trophy Boat Race during Onam is one of the largest in the world.', color: 'bg-emerald-50 border-emerald-200' },
      { fact: "Onam is Kerala's official state festival and a public holiday.", color: 'bg-teal-50 border-teal-200' },
      { fact: 'The festival lasts 10 days, with the main day called Thiruvonam.', color: 'bg-green-50 border-green-200' },
    ],
    quiz: [
      { question: "Which king's homecoming does Onam celebrate?", options: ['King Rama', 'King Mahabali', 'King Ashoka', 'King Vikramaditya'], answer: 1 },
      { question: 'What is the flower carpet made during Onam called?', options: ['Rangoli', 'Kolam', 'Pookalam', 'Alpana'], answer: 2 },
    ],
  },
  {
    title: 'Bihu',
    region: 'East India',
    category: 'Harvest',
    festivalDate: new Date('2026-04-14'),
    images: ['https://tse2.mm.bing.net/th/id/OIP.tW8GOravDxlFg7KgN9LswgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'],
    tagline: 'The heartbeat of Assam — where harvest, dance, and community become one.',
    description: "Assam's joyful harvest festival marked by traditional Bihu dance, music, and community feasting.",
    color: 'from-lime-400 to-yellow-300',
    status: 'published',
    story: '',
    whyCelebrate: "Bihu marks the Assamese New Year and the harvest season. It is a celebration of life, nature, and community — a time when the entire state comes together to dance, sing, and give thanks for the earth's bounty.",
    traditions: [
      'Bihu dance — energetic folk dance performed in groups',
      'Playing the dhol, pepa (horn), and gogona (jaw harp)',
      'Exchanging gamosa — a traditional white and red cloth',
      'Preparing traditional Assamese sweets like pitha and laru',
      'Husori — groups visiting homes singing Bihu songs',
    ],
    funFacts: [
      { fact: 'There are three types of Bihu — Rongali, Kongali, and Bhogali.', color: 'bg-lime-50 border-lime-200' },
      { fact: 'The Bihu dance holds a Guinness World Record for the largest folk dance performance.', color: 'bg-yellow-50 border-yellow-200' },
      { fact: 'Rongali Bihu (April) is the most celebrated and marks the Assamese New Year.', color: 'bg-lime-50 border-lime-200' },
      { fact: 'The gamosa cloth gifted during Bihu is a symbol of respect and love in Assam.', color: 'bg-green-50 border-green-200' },
    ],
    quiz: [
      { question: 'How many types of Bihu are there?', options: ['Two', 'Three', 'Four', 'Five'], answer: 1 },
      { question: 'What is the traditional cloth exchanged during Bihu called?', options: ['Dupatta', 'Gamosa', 'Lungi', 'Dhoti'], answer: 1 },
    ],
  },
]

const seed = async () => {
  await connectDB()

  const existing = await Festival.countDocuments()
  if (existing > 0) {
    console.log(`Database already has ${existing} festivals. Skipping seed.`)
    console.log('To re-seed, run: node seed.js --force')
    if (!process.argv.includes('--force')) {
      process.exit(0)
    }
    await Festival.deleteMany({})
    console.log('Cleared existing festivals.')
  }

  const inserted = await Festival.insertMany(festivals)
  console.log(`✅ Seeded ${inserted.length} festivals successfully!`)
  inserted.forEach(f => console.log(`  • ${f.title} (${f._id})`))
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
