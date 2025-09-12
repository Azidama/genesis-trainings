import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { CourseRepository } from '@/repositories/courses.repository'
import { Course } from '@/typedefs/courses.type'
import { CreateCourseDto } from '@/dtos/courses.dto'

@Resolver()
export class CourseResolver extends CourseRepository {
  @Authorized()
  @Query(() => [Course], {
    description: 'Get courses list',
  })
  async getCourses(): Promise<Course[]> {
    const courses: Course[] = await this.courseFindAll()
    return courses
  }

  @Authorized()
  @Mutation(() => [Course], {
    description: 'Create many Courses',
  })
  async createCourses(
    @Arg('courseData', () => [CreateCourseDto])
    courseData: CreateCourseDto[],
  ): Promise<Course[]> {
    const courses: Course[] = await this.createManyCourses(courseData)
    return courses
  }
}
