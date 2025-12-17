import { CourseEntity } from '@/entities/courses.entity'
import { Course } from '@/interfaces/courses.interface'
import { CreateCourseDto } from '@/dtos/courses.dto'
import dataSource from '@/database/config'

const courseEntity = dataSource.getRepository(CourseEntity)

export class CourseRepository {
  async findAll(): Promise<Course[]> {
    return courseEntity.find()
  }

  async findById(id: number): Promise<Course | null> {
    return courseEntity.findOne({ where: { id } })
  }

  async findByCode(code: string): Promise<Course | null> {
    return courseEntity.findOne({ where: { code } })
  }

  async create(courseData: CreateCourseDto): Promise<Course> {
    return courseEntity.create(courseData).save()
  }

  async updateById(id: number, courseData: Partial<Course>): Promise<void> {
    await courseEntity.update(id, courseData)
  }

  async deleteById(id: number): Promise<void> {
    await courseEntity.delete({ id })
  }
}
