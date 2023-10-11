/**
 * Адаптер — это структурный паттерн проектирования, который позволяет
 * объектам с несовместимыми интерфейсами работать вместе.
 *
 * [+] Отделяет и скрывает от клиента подробности преобразования различных интерфейсов.
 *
 * [-] Усложняет код программы из-за введения дополнительных классов.
 */

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