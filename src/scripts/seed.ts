// import 'reflect-metadata'
// import { CourseEntity } from '@/entities/courses.entity'
// import { createConnection, EntityRepository } from 'typeorm'

const courses = [
  {
    "code": "SE101",
    "title": "Shopify Ecommerce Programe",
    "description": "Build your ecommerce business from scratch with Shopify—learn everything including product sourcing, scaling & automation",
  },
  {
    "code": "TS102",
    "title": "Tiktok Shop Bootcamp",
    "description": "Master TikTok Shop Ecommerce in just 3 months through our practical course, helping you launch, manage, and scale your global online store",
  },
  {
    "code": "DMA103",
    "title": "Digital Marketing Expert (AI Powered)",
    "description": "Master digital marketing with the use of AI tools for SEO, paid ads, social media, and more — build your career or agency",
  },
  {
    "code": "CEH104",
    "title": "Cybersecurity & Ethical Hacking",
    "description": "Learn ethical hacking and cybersecurity techniques to protect systems and networks with real-world applications and industry tools.",
  },
  {
    "code": "PMP105",
    "title": "Project Management Professional (PMP)",
    "description": "Prepare for the PMP certification with expert guidance and real-world applications of project management principles across all domains.",
  },
  {
    "code": "GDX106",
    "title": "Graphic Designer Expert (From Scratch)",
    "description": "Kickstart your creative career as a graphic designer and gain hands-on mastery of industry-standard tools like Photoshop, Illustrator, and Canva",
  },
  {
    "code": "VEX107",
    "title": "Video Editing Expert (From Scratch)",
    "description": "Become a skilled video editing expert and transform raw footage into captivating, professional-quality stories with our immersive 3-month hands-on course",
  },
  {
    "code": "WMF108",
    "title": "Become a Walmart Freelancer",
    "description": "Become a successful freelancer and seller on Walmart using AI-powered tools. Master the Private Label and Wholesale models",
  },
  {
    "code": "AML109",
    "title": "AI/ML Developer (From Scratch)",
    "description": "Learn AI/ML from with this begineer-friendly course and build real-world projects using Python, TensorFlow, and modern AI tools",
  },
  {
    "code": "FSD110",
    "title": "Full Stack Web Developer",
    "description": "Master Full-Stack Web Development with our 3-month hands-on MERN course designed to build real-world applications",
  },
  {
    "code": "EBC111",
    "title": "eBay Boot Camp",
    "description": "Launch your eBay business with hands-on training and practical tools, taking you from a beginner to a pro in 3 months",
  }, 
  {
    "code": "AFB112",
    "title": "Amazon FBA Wholesale Bootcamp Using AI",
    "description": "Launch your Amazon FBA Wholesale business confidently using AI-powered tools, guided by expert-led, hands-on training every step of the way",
  },
]
// @EntityRepository(CourseEntity)
// export class CourseSeed {
  // public async seedCourses(): Promise<void> {
// const seedCourses = async () => {
//   const connection = await createConnection()
//   // Seed function
//     for (const course of courses) {
//       const courseEntity = new CourseEntity()
//       courseEntity."code" = course."code"
//       courseEntity."title" = course."title"
//       courseEntity."description" = course."description"
//       await courseEntity.save()
//     }
//   await connection.close()
// }
// }
// const courseInstance: CourseSeed = new CourseSeed
// courseInstance.
// seedCourses().catch(console.error)
