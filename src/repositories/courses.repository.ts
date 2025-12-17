// import { EntityRepository } from 'typeorm'
import { CourseEntity } from '@/entities/courses.entity'
import { HttpException } from '@exceptions/HttpException'
import { Course } from '@/interfaces/courses.interface'
import { CreateCourseDto } from '@/dtos/courses.dto'
import dataSource from '@/database/config'

// @EntityRepository(CourseEntity)
const courseEntity = dataSource.getRepository(CourseEntity)
export class CourseRepository {
  public async courseFindAll(): Promise<Course[]> {
    const courses: Course[] = await courseEntity.find()

    return courses
  }

  public async courseFindById(courseId: number): Promise<Course> {
    const course: Course = await courseEntity.findOne({ where: { id: courseId } })
    if (!course) throw new HttpException(409, "Course doesn't exist")

    return course
  }

  // TODO: fix DTOs and update query
  public async courseCreate(courseData: CreateCourseDto): Promise<Course> {
    const findCourse: Course = await courseEntity.findOne({ where: { code: courseData.code } })
    if (findCourse) throw new HttpException(409, `This Course ${courseData.code} already exists`)

    const createCourseData: Course = await courseEntity.create({ ...courseData }).save()

    return createCourseData
  }

  public async createManyCourses(coursesData: CreateCourseDto[]): Promise<Course[]> {
    const createdCourses: Course[] = []

    for (const courseData of coursesData) {
      try {
        const course = await this.courseCreate(courseData)
        createdCourses.push(course)
      } catch (error) {
        if (error instanceof HttpException && error.status === 409) {
          continue
        }
        throw error
      }
    }

    return createdCourses
  }

  public async courseUpdate(courseId: number, courseData: any): Promise<Course> {
    const findCourse: Course = await courseEntity.findOne({ where: { id: courseId } })
    if (!findCourse) throw new HttpException(409, "Course doesn't exist")

    await courseEntity.update(courseId, { ...courseData })

    const updateCourse: Course = await courseEntity.findOne({ where: { id: courseId } })
    return updateCourse
  }

  public async courseDelete(courseId: number): Promise<Course> {
    const findCourse: Course = await courseEntity.findOne({ where: { id: courseId } })
    if (!findCourse) throw new HttpException(409, "Course doesn't exist")

    await courseEntity.delete({ id: courseId })
    return findCourse
  }
}
