/**
 * Строитель — это порождающий паттерн проектирования, который позволяет создавать сложные объекты пошагово.
 * Строитель даёт возможность использовать один и тот же код строительства для получения разных представлений объектов.
 *
 * [+] Позволяет создавать продукты пошагово.
 * [+] Позволяет использовать один и тот же код для создания различных продуктов.
 * [+] Изолирует сложный код сборки продукта от его основной бизнес-логики.
 *
 * [-] Усложняет код программы из-за введения дополнительных классов.
 * [-] Клиент будет привязан к конкретным классам строителей, так как в интерфейсе директора может не быть метода получения результата.
 */

class User {
  public name: string;
  public age: number;
  public gender: 'male' | 'female';
}

class UserBuilder {
  private _user = new User();

  public reset(): UserBuilder {
    this._user = new User();
    return this;
  }

  public addName(name: User['name']): UserBuilder {
    this._user.name = name;
    return this;
  }

  public addAge(age: User['age']): UserBuilder {
    this._user.age = age;
    return this;
  }

  public addGender(gender: User['gender']): UserBuilder {
    this._user.gender = gender;
    return this;
  }

  public getUser(): User {
    return this._user;
  }
}

type UserParams = Parameters<typeof UserDirector['makeUserWithSpecifiedGender']> extends [infer Name, infer Age, ...infer _Rest] ? [Name, Age] : never;

abstract class UserDirector {
  private static userBuilder: UserBuilder;
  private static makeUserWithSpecifiedGender(name: User['name'], age: User['age'], gender: User['gender']): void {
    this.userBuilder.reset().addName(name).addAge(age).addGender(gender);
  }

  public static setUserBuilder(builder: UserBuilder): typeof UserDirector {
    this.userBuilder = builder
    return this;
  }
  public static makeMaleUser(...[name, age]: UserParams): void {
    this.makeUserWithSpecifiedGender(name, age, 'male');
  }

  public static makeFemaleUser(...[name, age]: UserParams): void {
    this.makeUserWithSpecifiedGender(name, age, 'female');
  }

  public static makeUserWithNameOnly(name: User['name']): void {
    this.userBuilder.reset().addName(name)
  }
}

export default () => {
  const user1 = new UserBuilder().addName('Vlad').addAge(1).getUser();
  const user2 = new UserBuilder().addName('Danius').addAge(99).getUser();
  const user3 = new UserBuilder().addName('Andrey').addGender('male').getUser();

  // Director
  const builder = new UserBuilder();
  UserDirector.setUserBuilder(builder)

  UserDirector.makeUserWithNameOnly('Kirill')
  const user4 = builder.getUser();
  UserDirector.makeFemaleUser('Dasha', 22)
  const user5 = builder.getUser();
  UserDirector.makeMaleUser('Nikita', 12)
  const user6 = builder.getUser();

  console.log({user1, user2, user3, user4, user5, user6})
}