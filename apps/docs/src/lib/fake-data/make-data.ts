import { faker } from "@faker-js/faker"

export interface IPerson {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: "relationship" | "complicated" | "single"
  subRows?: IPerson[]
}

const range = (len: number) => {
  const arr = []

  for (let i = 0; i < len; i++) {
    arr.push(i)
  }

  return arr
}

const newPerson = (): IPerson => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(40),
  visits: faker.datatype.number(1000),
  progress: faker.datatype.number(100),
  status: faker.helpers.shuffle<IPerson["status"]>([
    "relationship",
    "complicated",
    "single",
  ])[0]!,
})

export function makeData(...lens: number[]) {
  faker.seed(123)

  const makeDataLevel = (depth = 0): IPerson[] => {
    const len = lens[depth]!

    return range(len).map(
      (): IPerson => ({
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }),
    )
  }

  return makeDataLevel()
}
