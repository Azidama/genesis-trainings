import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { CourseService } from '@/services/courses.service'
import { Course } from '@/typedefs/courses.type'
import { CreateCourseDto } from '@/dtos/courses.dto'
import { CourseRepository } from '@/repositories/courses.repository'

@Resolver()
export class CourseResolver {
  private readonly courseService: CourseService

  constructor() {
    const repository = new CourseRepository()
    this.courseService = new CourseService(repository)
  }

  @Authorized()
  @Query(() => [Course], {
    description: 'Get courses list',
  })
  async getCourses(): Promise<Course[]> {
    return this.courseService.findAll()
  }

  @Authorized()
  @Mutation(() => [Course], {
    description: 'Create many Courses',
  })
  async createCourses(
    @Arg('courseData', () => [CreateCourseDto])
    courseData: CreateCourseDto[],
  ): Promise<Course[]> {
    return this.courseService.createMany(courseData)
  }
}
