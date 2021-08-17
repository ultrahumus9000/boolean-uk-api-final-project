const faker = require("faker");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const array = [0, 1, 2, 3, 4];

function getRamdomInt(array) {
  return Math.floor(Math.random() * array.length);
}

const avatarArray = [
  "https://images.pexels.com/photos/4492100/pexels-photo-4492100.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/5799685/pexels-photo-5799685.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/4646246/pexels-photo-4646246.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/4047318/pexels-photo-4047318.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
];

const pictures = [
  "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
];

const foodtags = [
  "chinese",
  "indian food",
  "japanese",
  "italian",
  "spanish",
  "lebanese",
];

async function seed() {
  for await (const ele of array) {
    const result = await db.user.create({
      data: {
        username: faker.name.lastName(),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: avatarArray[ele],
        posts: {
          create: {
            date: faker.date.past(1),
            text_content: faker.random.words(10),
            picture: pictures[ele],
            address: faker.address.cityName(),
          },
        },
      },
    });

    await db.archive.create({
      data: {
        userId: result.id,
      },
    });
  }
}
seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });

//   model User {
//     id         Int       @id @default(autoincrement())
//     username   String    @unique
//     password   String    @db.VarChar(15)
//     first_name String    @db.VarChar(30)
//     last_name  String    @db.VarChar(30)
//     email      String    @unique
//     avatar     String
//     comments   Comment[]
//     posts      Post[]
//     archive    Archive

//   }

//   model Comment {
//     id      Int    @id @default(autoincrement())
//     content String
//     user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)
//     userId  Int
//     post    Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
//     postId  Int

//     @@map("comments")
//   }

//   model Post {
//     id           Int         @id @default(autoincrement())
//     date         DateTime    @db.Date
//     text_content String      @default("")
//     picture      String
//     likes        Int         @default(0)
//     address      String?     @db.VarChar(50)
//     user         User        @relation(fields: [userId], references: [id], onDelete: Cascade)
//     userId       Int
//     comments     Comment[]
//     posttotags   PostToTag[]
//     postToTagId  Int?
//     archives     Archive[]

//     @@map("posts")
//   }

//   model PostToTag {
//     id     Int  @id @default(autoincrement())
//     post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
//     postId Int
//     tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)
//     tagId  Int
//   }

//   model Tag {
//     id         Int         @id @default(autoincrement())
//     type       String
//     postToTags PostToTag[]
//   }

//   model Archive {
//     id     Int    @id @default(autoincrement())
//     userId Int
//     user   User[]
//     posts  Post[] @relation(fields: [postId], references: [id])
//     postId Int?
//   }
