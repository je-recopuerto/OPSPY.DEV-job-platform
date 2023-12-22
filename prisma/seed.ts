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

  // const sam = await prisma.user.create({
  //   data: {
  //     email: "sam.smith@gmail.com",
  //     emailVerified: new Date(),
  //     name: "Sam Smith",
  //     isOnboarded: true,
  //     profile: {
  //       create: {
  //         firstName: "Sam",
  //         lastName: "Smith",
  //         bio: "I am a 3D Artist",
  //         dateOfBirth: new Date(),
  //       },
  //     },
  //   },
  // });

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

  // const samsCompany = await prisma.company.create({
  //   data: {
  //     name: "Sam's Company",
  //     description:
  //       "Sams Typewriter CO typewriter repair shop, seeking a front end web developer to work on a site to sell our services.",
  //     logoUrl:
  //       "https://cdn.discordapp.com/attachments/483700323098034208/1183088887610998854/Underwood_Standard_Typewriter2.jpg?ex=65871063&is=65749b63&hm=163f2b13a5791731b1f1fc1c111a957f2d5d3fb40041ce96e5d3baef5c6980be&",
  //     website: "https://samsmith.com",
  //     owner: {
  //       connect: {
  //         id: sam.id,
  //       },
  //     },
  //   },
  // });

  const amazon = await prisma.company.create({
    data: {
      name: "Amazon",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      logoUrl:
        "https://media.glassdoor.com/sql/6036/amazon-squarelogo-1552847650117.png",
      website: "https://amazon.com",
      owner: {
        connect: {
          id: jonny.id,
        },
      },
      openings: {
        create: [
          {
            title: "Dev Ops Engineer Apprentice (24 Months)",
            description:
              "Candidates should be 18 years or over before the start date and have the right to live and work in England\n" +
              "\n" +
              "For the apprenticeship program we prioritize applicants eligible to government funding for their apprenticeship and for this you need to:\n" +
              "\n" +
              "    Have lived in the UK or in the European Economic Area (EEA) for the last 3 years\n" +
              "    Be a resident of the UK for the entire duration of the program\n" +
              "    Not be registered to study on a UK government funded course ending June 2024 or later\n" +
              "    5 GCSEs including 1 STEM, Maths and English grade C/4 or above, or equivalent qualifications\n",
            location: "London, UK",
            type: "FULL_TIME",
            minSalary: 20000.0,
            maxSalary: 25000.0,
            currency: "GBP",
            workMode: "REMOTE",
          },
          {
            title: "Software Development Engineer Apprentice (42 months)",
            description:
              "Candidates should be 18 years or over before the start date and have the right to live and work in England\n" +
              "\n" +
              "For the apprenticeship program we prioritize applicants eligible to government funding for their apprenticeship and for this you need to:\n" +
              "\n" +
              "    Have lived in the UK or in the European Economic Area (EEA) for the last 3 years\n" +
              "    Be a resident of the UK for the entire duration of the program\n" +
              "    Not be registered to study on a UK government funded course ending August 2024 or later\n" +
              "    At least 5 GCSEs C grade (grade 4) or above including Maths and English plus any of the following:\n" +
              "    3 A-Levels (or equivalent qualification) grade C or above. Minimum of 1 A-Level must be within a STEM subject\n" +
              "    You must NOT already have a qualification in a similar subject at the same or higher level than this apprenticeship*\n" +
              "\n" +
              "Please note, you will be required to evidence your qualifications. If you have gained qualifications outside of the UK you will be required to evidence that they are equivalent.\n" +
              "\n" +
              "Note: This Apprenticeship assumes the candidate has some or little knowledge/experience of the occupation, and is NOT suitable for candidates who already have a similar or higher-level qualification in the same or similar subject of the apprenticeship. If you already have related qualifications or 2 years plus experience in this field please visit amazon.jobs\n" +
              "\n" +
              "Find your Future with Amazon Apprenticeships\n" +
              "\n" +
              "Investment in Apprentices is in our DNA. We look to constantly innovate and create. In order to do this, we recognise that whilst technology is a partner, it’s our people that power us.\n" +
              "\n" +
              "We offer a broad range of Apprenticeship opportunities to suit all candidates with different backgrounds, qualifications and career aspirations, so whether you are embarking on your career or want a change of direction, we have an Apprenticeship program for you, that will support your development in an innovative environment.\n" +
              "\n" +
              "We’re looking for those with a passion for learning. You’ll need to be committed to your own development whilst implementing what you are learning as you progress through your program. In return we provide first class on the job coaching, specialist partner training and unparalleled experiences. You’ll be working within a diverse, innovative environment where you will be challenged to excel and contribute.\n" +
              "\n" +
              "Apply today to be part of the story.\n" +
              "\n" +
              "In this role you will be providing technology enabled solutions to a range of areas including software, business and systems analysis, cyber security, data analysis and network infrastructure. You will be implementing technology solutions that enable businesses to develop new products and services and to increase an organisations productivity using digital technologies. You will also identify yourself as confident in your capabilities to provide technical support to the wider team. You will possess strong communication skills as well as being able to work effectively as a group or on your own.\n" +
              "\n" +
              "As a Software Development Engineer apprentice at Amazon, you’ll gain a vast range of useful experiences and skills. You will work towards the Level 6 Software development apprenticeship standard, and also work towards a BSc (Hons) in Digital & Technology Solutions (Software Developer pathway).\n" +
              "\n" +
              "Key job responsibilities\n" +
              "You will be combining working in your assigned team as a Software Development Engineer apprentice whilst continuing your studies to achieve your qualification. As a working student your focus is to complete your studies in your 20% off the job time by learning and developing your skills, knowledge and behaviours to work towards successful graduation. You will be set objectives and goals by your training provider and manager to support your studies.\n" +
              "\n" +
              "You will build your skills over a 42-month period, starting in September. These skills will help you develop personally and professionally. Your apprenticeship will be made up of classroom/virtual based training to cover knowledge, on-the-job training at your Amazon base location, online learning as well as mentoring from our experienced team members.\n" +
              "\n" +
              "As you progress through your apprenticeship you will become competent at:\n" +
              "\n" +
              "    Designing and developing software solutions\n" +
              "    Collaborating with cross-functional teams on various projects\n" +
              "    Analysing and solving complex technical challenges\n" +
              "    Participating in code reviews and ensuring code quality\n" +
              "    Implementing software security measures and compliance\n" +
              "    Staying updated with the latest software development trends and emerging technologies\n" +
              "\n" +
              "In this program, you will immerse yourself in cutting-edge software techniques, acquiring the skills to design, develop, and optimise software solutions using the latest methodologies and technologies. A significant focus is placed on gaining expertise in project management, equipping you to effectively manage complex software projects from inception to delivery. Additionally, you will master the art of creating robust and scalable software architectures, ensuring the foundation for high-performing applications.\n" +
              "\n" +
              "Cultivating the ability to work in dynamic teams and contribute innovative solutions is an integral aspect of the curriculum, emphasizing collaboration and innovation. The program also underscores the importance of quality assurance, instilling practices to ensure the highest quality and reliability of software through rigorous testing and quality control. Understanding critical aspects of software security and legal compliance is essential, ensuring adherence to industry standards and maintaining the integrity and security of software systems. Through this comprehensive approach, you will be well-prepared to navigate the dynamic landscape of software development, contributing to innovative and high-quality solutions in the ever-evolving technology industry.\n" +
              "\n" +
              "We are open to hiring candidates to work out of one of the following locations:\n" +
              "\n" +
              "Cambridge, GBR\n" +
              "\n" +
              "These will be a plus for your career at Amazon, but are not necessary to enter the program:\n" +
              "\n" +
              "    You are able to operate in a fast-paced environment\n" +
              "    You are able to demonstrate drive and a passion for learning\n" +
              "\n" +
              "Your recruitment process will start with your online application. You’ll be asked to upload your CV, answer some questions that will help us to ensure your eligible for the programme and finally you’ll complete a short online assessment.\n" +
              "\n" +
              "You will then be invited to complete a game-based assessment, to assess your suitability for an apprenticeship role at Amazon.\n" +
              "\n" +
              "To get to know you beyond your CV, the next stage of the process will be our online evaluations. You’ll complete 3 video questions to tell us more about you, your motivations and any transferrable skills you have.\n" +
              "\n" +
              "As a last step, we will invite successful candidates to an assessment centre where you’ll get the chance to meet the recruitment team and the hiring teams that align to the programme you have applied for. As part of the assessment centre, you may be expected to take part in a group exercise, a presentation, 1 to 1 interviews and other tasks relating to your chosen programme. After you’ve attended the assessment centre, the recruitment team will be in contact to confirm the outcome of your application.\n" +
              "\n" +
              "Amazon is an equal opportunities employer. We believe passionately that employing a diverse workforce is central to our success. We make recruiting decisions based on your experience and skills. We value your passion to discover, invent, simplify and build. Protecting your privacy and the security of your data is a longstanding top priority for Amazon. Please consult our Privacy Notice (https://www.amazon.jobs/en/privacy_page) to know more about how we collect, use and transfer the personal data of our candidates.\n" +
              "\n" +
              "Our inclusive culture empowers Amazonians to deliver the best results for our customers. If you have a disability and need an adjustment during the application and hiring process, including support for the interview or onboarding process, please contact the Applicant-Candidate Accommodation Team (ACAT), Monday through Friday from 7:00 am GMT - 4:00 pm GMT. If calling directly from the United Kingdom, please dial +44 800 086 9884 (tel: +448000869884). If calling from Ireland, please dial +353 1800 851 489 (tel: +3531800851489).",
            location: "Cambridgeshire, UK",
            type: "FULL_TIME",
            minSalary: 20000.0,
            maxSalary: 25000.0,
            currency: "GBP",
            workMode: "HYBRID",
          },
        ],
      },
    },
  });

  // const jonnysCompany = await prisma.company.create({
  //   data: {
  //     name: "Jonathan's Company",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     logoUrl:
  //       "https://cdn.discordapp.com/attachments/483700323098034208/1183091139922886696/Z.png?ex=6587127c&is=65749d7c&hm=c4830a09e5ab7f36c853733457cd208bbb1c28031e4f4a4c9e934f954cd68dab&",
  //     website: "https://ruffles.pw/",
  //     openings: {
  //       create: [
  //         {
  //           title: "Senior Frontend Developer",
  //           description:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //           location: "London, UK",
  //           type: "FULL_TIME",
  //           minSalary: 50000.0,
  //           maxSalary: 60000.0,
  //           currency: "GBP",
  //           remote: true,
  //           tags: {
  //             connect: [
  //               {
  //                 name: "React",
  //               },
  //               {
  //                 name: "TypeScript",
  //               },
  //               {
  //                 name: "GraphQL",
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           title: "Senior Backend Developer",
  //           description:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //           location: "London, UK",
  //           type: "FULL_TIME",
  //           minSalary: 50000.0,
  //           maxSalary: 60000.0,
  //           currency: "GBP",
  //           remote: true,
  //           tags: {
  //             connect: [
  //               {
  //                 name: ".NET",
  //               },
  //               {
  //                 name: "RabbitMQ",
  //               },
  //               {
  //                 name: "Docker",
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           title: "Senior Fullstack Developer",
  //           description:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //           location: "London, UK",
  //           type: "FULL_TIME",
  //           minSalary: 50000.0,
  //           maxSalary: 60000.0,
  //           currency: "GBP",
  //           remote: true,
  //           tags: {
  //             connect: [
  //               {
  //                 name: "React",
  //               },
  //               {
  //                 name: "TypeScript",
  //               },
  //               {
  //                 name: "GraphQL",
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           title: "Senior Frontend Developer",
  //           description:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //           location: "London, UK",
  //           type: "FULL_TIME",
  //           minSalary: 50000.0,
  //           maxSalary: 60000.0,
  //           currency: "GBP",
  //           remote: true,
  //         },
  //         {
  //           title: "Senior Backend Developer",
  //           description:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //           location: "London, UK",
  //           type: "FULL_TIME",
  //           minSalary: 50000.0,
  //           maxSalary: 60000.0,
  //           currency: "GBP",
  //           remote: true,
  //         },
  //         {
  //           title: "Senior Fullstack Developer",
  //           description:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //           location: "London, UK",
  //           type: "FULL_TIME",
  //           minSalary: 50000.0,
  //           maxSalary: 60000.0,
  //           currency: "GBP",
  //           remote: true,
  //         },
  //       ],
  //     },
  //     owner: {
  //       connect: {
  //         id: jonny.id,
  //       },
  //     },
  //   },
  // });

  console.log({ jonny, amazon });
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
