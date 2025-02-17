import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const users = [
      {
        id: 1,
        email: 'user.one@example.com',
        hashedPassword: 'fake_hash',
        fullName: 'User One',
        salt: 'fake_salt',
      },
      {
        id: 2,
        email: 'user.two@example.com',
        hashedPassword: 'fake_hash',
        fullName: 'User Two',
        salt: 'fake_salt',
      },
    ]

    if ((await db.user.count()) === 0) {
      await Promise.all(users.map((user) => db.user.create({ data: user })))
    } else {
      console.log('Users already seeded')
    }
  } catch (error) {
    console.error(error)
  }

  try {
    const posts = [
      {
        title: 'Welcome to the blog!',
        body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
        authorId: 1,
      },
      {
        title: 'A little more about me',
        body: "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
        authorId: 1,
      },
      {
        title: 'What is the meaning of life?',
        body: 'Meh waistcoat succulents umami asymmetrical, hoodie post-ironic paleo chillwave tote bag. Trust fund kitsch waistcoat vape, cray offal gochujang food truck cloud bread enamel pin forage. Roof party chambray ugh occupy fam stumptown. Dreamcatcher tousled snackwave, typewriter lyft unicorn pabst portland blue bottle locavore squid PBR&B tattooed.',
        authorId: 2,
      },
    ]

    if ((await db.post.count()) === 0) {
      await Promise.all(
        posts.map(async (post) => {
          const newPost = await db.post.create({ data: post })

          console.log(newPost)
        })
      )
    } else {
      console.log('Posts already seeded')
    }
  } catch (error) {
    console.error(error)
  }

  try {
    const stalls = [
      {
        id: 'clr0zv6ow000012nvo6r09vog',
        name: 'Salad Veggies',
        stallNumber: '1',
      },
      {
        id: 'clr0zvne2000112nvyhzf1ifk',
        name: 'Pie Veggies',
        stallNumber: '2',
      },
      {
        id: 'clr0zvne3000212nv6boae9qw',
        name: 'Root Veggies',
        stallNumber: '3',
      },
    ]

    if ((await db.stall.count()) === 0) {
      await Promise.all(
        stalls.map(async (stall) => {
          const newStall = await db.stall.create({ data: stall })

          console.log(newStall)
        })
      )
    } else {
      console.log('Stalls already seeded')
    }

    const produce = [
      {
        id: 'clr0zwyoq000312nvfsu1efcw',
        name: 'Lettuce',
        quantity: 10,
        price: 2,
        ripenessIndicators: null,
        region: '',
        isSeedless: false,
        vegetableFamily: 'Asteraceae',
        stallId: 'clr0zv6ow000012nvo6r09vog',
      },
      {
        id: 'clr0zy32x000412nvsya5g8q0',
        name: 'Strawberries',
        quantity: 24,
        price: 3,
        ripenessIndicators: 'Vitamin C',
        region: 'California',
        isSeedless: false,
        vegetableFamily: 'Soft',
        stallId: 'clr0zvne2000112nvyhzf1ifk',
      },
    ]

    if ((await db.produce.count()) === 0) {
      await Promise.all(
        produce.map(async (produce) => {
          const newProduce = await db.produce.create({ data: produce })

          console.log(newProduce)
        })
      )
    } else {
      console.log('Produce already seeded')
    }
  } catch (error) {
    console.error(error)
  }

  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const data: Prisma.UserExampleCreateArgs['data'][] = [
      // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      // { name: 'alice', email: 'alice@example.com' },
      // { name: 'mark', email: 'mark@example.com' },
      // { name: 'jackie', email: 'jackie@example.com' },
      // { name: 'bob', email: 'bob@example.com' },
    ]
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    await Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
        const record = await db.userExample.create({ data })
        console.log(record)
      })
    )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
