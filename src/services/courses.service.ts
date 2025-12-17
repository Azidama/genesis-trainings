import { CourseRepository } from '@/repositories/courses.repository'
import { CreateCourseDto } from '@/dtos/courses.dto'
import { Course } from '@/interfaces/courses.interface'
import { HttpException } from '@exceptions/HttpException'

export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async findAll(): Promise<Course[]> {
    return this.repository.findAll()
  }

  async findById(courseId: number): Promise<Course> {
    const course = await this.repository.findById(courseId)
    if (!course) {
      throw new HttpException(409, "Course doesn't exist")
    }
    return course
  }

  async create(courseData: CreateCourseDto): Promise<Course> {
    const existing = await this.repository.findByCode(courseData.code)
    if (existing) {
      throw new HttpException(409, `This Course ${courseData.code} already exists`)
    }

    return this.repository.create(courseData)
  }

  async createMany(coursesData: CreateCourseDto[]): Promise<Course[]> {
    const created: Course[] = []

    for (const data of coursesData) {
      try {
        const course = await this.create(data)
        created.push(course)
      } catch (error) {
        if (error instanceof HttpException && error.status === 409) {
          continue
        }
        throw error
      }
    }

    return created
  }

  async update(courseId: number, courseData: any): Promise<Course> {
    const existing = await this.repository.findById(courseId)
    if (!existing) {
      throw new HttpException(409, "Course doesn't exist")
    }

    await this.repository.updateById(courseId, courseData)

    return this.repository.findById(courseId)
  }

  async delete(courseId: number): Promise<Course> {
    const existing = await this.repository.findById(courseId)
    if (!existing) {
      throw new HttpException(409, "Course doesn't exist")
    }

    await this.repository.deleteById(courseId)
    return existing
  }
}
