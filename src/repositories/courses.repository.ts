import { EntityRepository } from 'typeorm'
import { CourseEntity } from '@/entities/courses.entity'
import { HttpException } from '@exceptions/httpException'
import { Course } from '@/interfaces/courses.interface'

@EntityRepository(CourseEntity)
export class CourseRepository {
  public async courseFindAll(): Promise<Course[]> {
    const courses: Course[] = await CourseEntity.find()

    return courses
  }

  public async courseFindById(courseId: string): Promise<Course> {
    const course: Course = await CourseEntity.findOne({ where: { id: courseId } })
    if (!course) throw new HttpException(409, "Course doesn't exist")

    return course
  }

  // TODO: fix DTOs and types
  public async courseCreate(courseData: any): Promise<Course> {
    const findCourse: Course = await CourseEntity.findOne({ where: { id: courseData.id } })
    if (findCourse) throw new HttpException(409, `This Course ${courseData.code} already exists`)

    const createCourseData: Course = await CourseEntity.create({ ...courseData })
    // .save()

    return createCourseData
  }

  public async courseUpdate(courseId: string, courseData: any): Promise<Course> {
    const findCourse: Course = await CourseEntity.findOne({ where: { id: courseId } })
    if (!findCourse) throw new HttpException(409, "Course doesn't exist")

    await CourseEntity.update(courseId, { ...courseData })

    const updateCourse: Course = await CourseEntity.findOne({ where: { id: courseId } })
    return updateCourse
  }

  public async courseDelete(courseId: number): Promise<Course> {
    const findCourse: Course = await CourseEntity.findOne({ where: { id: courseId } })
    if (!findCourse) throw new HttpException(409, "Course doesn't exist")

    await CourseEntity.delete({ id: courseId })
    return findCourse
  }
}
