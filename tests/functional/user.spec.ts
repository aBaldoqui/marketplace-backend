import { test } from '@japa/runner'

test.group('User', () => {
  test("Register an normal user", async ({client}) =>{
    const response = await client.post("/register/clientuser")

    response.assertStatus(200)
  })

  test("Register an vendor", async ({client})=>{
    const response = await client.post("/register/vendoruser")
  
    response.assertStatus(200)
  })

  test("Login an user", async ({client}) =>{
    const response = await client.post("login/clientuser")
  
    response.assertStatus(200)
  })
  
  test("Login an vendor", async ({client})=>{
    const response = await client.post("login/vendoruser")
  
    response.assertStatus(200)
  })
})
