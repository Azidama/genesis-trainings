import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CourseRepository } from '@/repositories/courses.repository'
import { Course } from '@/typedefs/courses.type'

@Resolver()
export class CourseResolver extends CourseRepository {
  @Query(() => [Course], {
    description: 'Get courses list',
  })
  async getCourses(): Promise<Course[]> {
    const courses: Course[] = await this.courseFindAll()
    return courses
  }

}
