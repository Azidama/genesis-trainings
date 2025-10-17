import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/config"
import { UserEntity } from "@/entities/users.entity"
import { UserRole } from "@/interfaces/users.interface"
import bcrypt from 'bcrypt'
import { CourseEntity } from "@/entities/courses.entity"
import AppDataSource from "@/database/config"

export const courses = [
  {
    code: "SHOPIFY_ECOM",
    index: "shopify",
    title: "Shopify Ecommerce Programme",
    shorttitle: "Shopify Ecommerce Programme",
    description:
      "Build your ecommerce business from scratch with Shopify—learn everything including product sourcing, scaling & automation",
  },
  {
    code: "TIKTOK_BOOTCAMP",
    index: "tiktok-bootcamp",
    title: "Tiktok Shop Bootcamp",
    shorttitle: "Tiktok Shop Bootcamp",
    description:
      "Master TikTok Shop Ecommerce in just 3 months through our practical course, helping you launch, manage, and scale your global online store",
  },
  {
    code: "DIGITAL_MARKETING_AI",
    index: "digital-marketing-expert",
    title: "Digital Marketing Expert (AI Powered)",
    shorttitle: "Digital Marketing Expert (AI Powered)",
    description:
      "Master digital marketing with the use of AI tools for SEO, paid ads, social media, and more — build your career or agency",
  },
  {
    code: "CYBER_ETHICAL_HACKING",
    index: "cybersecurity-ethical-hacking",
    title: "Cybersecurity & Ethical Hacking",
    shorttitle: "Cybersecurity & Ethical Hacking",
    description:
      "Learn ethical hacking and cybersecurity techniques to protect systems and networks with real-world applications and industry tools.",
  },
  {
    code: "PMP_PRO",
    index: "project-management-professional",
    title: "Project Management Professional (PMP)",
    shorttitle: "Project Management Professional (PMP)",
    description:
      "Prepare for the PMP certification with expert guidance and real-world applications of project management principles across all domains.",
  },
  {
    code: "GRAPHIC_DESIGN",
    index: "graphic-designer-expert",
    title: "Graphic Designer Expert (From Scratch)",
    shorttitle: "Graphic Designer Expert (From Scratch)",
    description:
      "Kickstart your creative career as a graphic designer and gain hands-on mastery of industry-standard tools like Photoshop, Illustrator, and Canva",
  },
  {
    code: "VIDEO_EDITING",
    index: "video-editing-expert",
    title: "Video Editing Expert (From Scratch)",
    shorttitle: "Video Editing Expert (From Scratch)",
    description:
      "Become a skilled video editing expert and transform raw footage into captivating, professional-quality stories with our immersive 3-month hands-on course",
  },
  {
    code: "WALMART_FREELANCER",
    index: "walmart-freelancer",
    title: "Become a Walmart Freelancer",
    shorttitle: "Become a Walmart Freelancer",
    description:
      "Become a successful freelancer and seller on Walmart using AI-powered tools. Master the Private Label and Wholesale models",
  },
  {
    code: "AI_ML_DEV",
    index: "ai-ml-developer",
    title: "AI/ML Developer (From Scratch)",
    shorttitle: "AI/ML Developer (From Scratch)",
    description:
      "Learn AI/ML from scratch with this beginner-friendly course and build real-world projects using Python, TensorFlow, and modern AI tools",
  },
  {
    code: "FULL_STACK_WEBDEV",
    index: "full-stack-web-developer",
    title: "Full Stack Web Developer",
    shorttitle: "Full Stack Web Developer",
    description:
      "Master Full-Stack Web Development with our 3-month hands-on MERN course designed to build real-world applications",
  },
  {
    code: "EBAY_BOOTCAMP",
    index: "ebay-bootcamp",
    title: "eBay Boot Camp",
    shorttitle: "eBay Boot Camp",
    description:
      "Launch your eBay business with hands-on training and practical tools, taking you from a beginner to a pro in 3 months",
  },
  {
    code: "AMAZON_FBA_AI",
    index: "amazon-fba-bootcamp",
    title: "Amazon FBA Wholesale Bootcamp Using AI",
    shorttitle: "Amazon FBA Wholesale Bootcamp Using AI",
    description:
      "Launch your Amazon FBA Wholesale business confidently using AI-powered tools, guided by expert-led, hands-on training every step of the way",
  },
]

export const seedDb = async () => {
  const userRepo = AppDataSource.getRepository(UserEntity)
  const existingAdmin = await userRepo.findOne({ where: { role: UserRole.ADMIN } })
  if (!existingAdmin) {
    const admin = userRepo.create({
      name: 'Admin',
      email: ADMIN_EMAIL,
      role: UserRole.ADMIN,
      password: ADMIN_PASSWORD,
    })
    await userRepo.save(admin)
    console.log('Seeded admin account')
  } else {
    console.log('Admin already exists')
  }
  const courseRepo = AppDataSource.getRepository(CourseEntity)
  for (const course of courses) {
    const existingCourse = await courseRepo.findOne({ where: { code: course.code } }) 
    if(!existingCourse){
      const createCourse = courseRepo.create({
        code: course.code,
        description: course.description,
        title: course.title
      })
      await courseRepo.save(createCourse)
    }
  }
}
