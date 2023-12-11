import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedTags() {
  const graphql = await prisma.tag.create({
    data: {
      name: "GraphQL",
    },
  });

  const react = await prisma.tag.create({
    data: {
      name: "React",
    },
  });

  const typescript = await prisma.tag.create({
    data: {
      name: "TypeScript",
    },
  });

  const dotnet = await prisma.tag.create({
    data: {
      name: ".NET",
    },
  });

  const rabbitmq = await prisma.tag.create({
    data: {
      name: "RabbitMQ",
    },
  });

  const docker = await prisma.tag.create({
    data: {
      name: "Docker",
    },
  });

  console.log({ graphql, react, typescript, dotnet, rabbitmq, docker });
}

async function main() {
  await seedTags();

  const sam = await prisma.user.create({
    data: {
      email: "sam.smith@gmail.com",
      emailVerified: new Date(),
      name: "Sam Smith",
      isOnboarded: true,
      profile: {
        create: {
          firstName: "Sam",
          lastName: "Smith",
          bio: "I am a 3D Artist",
          dateOfBirth: new Date(),
        },
      },
    },
  });

  const jonny = await prisma.user.create({
    data: {
      email: "jonathan.ruffles@gmail.com",
      emailVerified: new Date(),
      name: "Jonathan Ruffles",
      isOnboarded: true,
      profile: {
        create: {
          firstName: "Jonathan",
          lastName: "Ruffles",
          bio: "Passionate full-stack application & library developer. 5 years experience in game development (Unity)",
          dateOfBirth: new Date(),
        },
      },
    },
  });

  const samsCompany = await prisma.company.create({
    data: {
      name: "Sam's Company",
      description:
        "Sams Typewriter CO typewriter repair shop, seeking a front end web developer to work on a site to sell our services.",
      logoUrl:
        "https://cdn.discordapp.com/attachments/483700323098034208/1183088887610998854/Underwood_Standard_Typewriter2.jpg?ex=65871063&is=65749b63&hm=163f2b13a5791731b1f1fc1c111a957f2d5d3fb40041ce96e5d3baef5c6980be&",
      website: "https://samsmith.com",
      owner: {
        connect: {
          id: sam.id,
        },
      },
    },
  });

  const jonnysCompany = await prisma.company.create({
    data: {
      name: "Jonathan's Company",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      logoUrl:
        "https://cdn.discordapp.com/attachments/483700323098034208/1183091139922886696/Z.png?ex=6587127c&is=65749d7c&hm=c4830a09e5ab7f36c853733457cd208bbb1c28031e4f4a4c9e934f954cd68dab&",
      website: "https://ruffles.pw/",
      openings: {
        create: [
          {
            title: "Senior Frontend Developer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 50000.0,
            maxSalary: 60000.0,
            currency: "GBP",
            remote: true,
            tags: {
              connect: [
                {
                  name: "React",
                },
                {
                  name: "TypeScript",
                },
                {
                  name: "GraphQL",
                },
              ],
            },
          },
          {
            title: "Senior Backend Developer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 50000.0,
            maxSalary: 60000.0,
            currency: "GBP",
            remote: true,
            tags: {
              connect: [
                {
                  name: ".NET",
                },
                {
                  name: "RabbitMQ",
                },
                {
                  name: "Docker",
                },
              ],
            },
          },
          {
            title: "Senior Fullstack Developer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 50000.0,
            maxSalary: 60000.0,
            currency: "GBP",
            remote: true,
            tags: {
              connect: [
                {
                  name: "React",
                },
                {
                  name: "TypeScript",
                },
                {
                  name: "GraphQL",
                },
              ],
            },
          },
          {
            title: "Senior Frontend Developer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 50000.0,
            maxSalary: 60000.0,
            currency: "GBP",
            remote: true,
          },
          {
            title: "Senior Backend Developer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 50000.0,
            maxSalary: 60000.0,
            currency: "GBP",
            remote: true,
          },
          {
            title: "Senior Fullstack Developer",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 50000.0,
            maxSalary: 60000.0,
            currency: "GBP",
            remote: true,
          },
        ],
      },
      owner: {
        connect: {
          id: jonny.id,
        },
      },
    },
  });

  console.log({ sam, samsCompany, jonny, jonnysCompany });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
