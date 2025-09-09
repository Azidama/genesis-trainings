import { App } from '@/app'
import { AuthResolver } from '@resolvers/auth.resolver'
import { UserResolver } from '@resolvers/users.resolver'
import { ValidateEnv } from '@utils/validateEnv'
import { CourseResolver } from './resolvers/courses.resolver'
import { RegistrationResolver } from './resolvers/registrations.resolver'

ValidateEnv()

const app = new App([AuthResolver, UserResolver, CourseResolver, RegistrationResolver])

app.listen()
