import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, salt);

    const user = this.create({ ...authCredentialsDto, password: hashedPassword });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505') { //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('Something wrong');
      }
    }
  }
}
