import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const sam = await prisma.user.create({
    data: {
      email: 'sam.smith@gmail.com',
      emailVerified: new Date(),
      name: 'Sam Smith',
      isOnboarded: true,
      profile: {
        create: {
          firstName: 'Sam',
          lastName: 'Smith',
          bio: 'I am a 3D Artist',
          dateOfBirth: new Date(),
        },
      },
    },
  })

  const samsCompany = await prisma.company.create({
    data: {
      name: 'Sam\'s Company',
      description: 'My company',
      // website: 'https://samsmith.com',
      owner: {
        connect: {
          id: sam.id,
        },
      },
    },
  })

  console.log({sam, samsCompany})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })