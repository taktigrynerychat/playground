interface UserDto {
  name: string,
  lastName: string,
  age: number
}

interface User {
  fullName: string,
  age: number
}

abstract class Api {
  public static getUser(): UserDto {
    return {
      name: 'Vlad',
      lastName: 'Rusakov',
      age: 25
    }
  }
}

abstract class Adapter {
  public static getUser(): User {
    const {name, lastName, age} = Api.getUser();
    return {
      fullName: `${name} ${lastName}`,
      age
    }
  }
}

export default () => {
  const userDto: UserDto = Api.getUser();
  const user: User = Adapter.getUser();
  console.log({user, userDto});
}