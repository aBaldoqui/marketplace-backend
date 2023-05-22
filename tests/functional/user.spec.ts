import { test } from '@japa/runner'

test.group('User', () => {
  test("Register an user", async ({client}) =>{
    const response = await client.post("/user/").form({
      name:"João Pedro Pereira Santos de Almeida Filho",
      email:"jp@gmail.com",
      password: "bololohaha"
    })

    response.assertStatus(200)
  })

  test("login an user", async ({client}) =>{
    const user = await client.post("/user/").form({
      name:"João Pedro Pereira Santos de Almeida Filho",
      email:"jasdp@gmail.com",
      password: "bololohaha"
    })

    const response = await client.post("/login").form({
      email:"jasdp@gmail.com",
      password: "bololohaha"
    })
    console.log(user)
    response.assertStatus(200)
  })
  
})
