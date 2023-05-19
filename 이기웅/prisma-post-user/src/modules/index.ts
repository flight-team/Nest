import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

const Modules = [AuthModule, UserModule, PostModule, RoleModule];

export default Modules;
