const { test } = require('../support');
const { faker} = require('@faker-js/faker')

test('deve logar como adm', async ({page})=>{
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

})

test('não deve logar com senha incorreta', async ({page})=>{
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd456')
    
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)

})

test('não deve logar com email invalido', async ({page})=>{
    await page.login.visit()
    await page.login.submit('admin.zombieplus.com', 'pwd123')
    await page.login.alertHaveText('Email incorreto')

})

test('não deve logar com email vazio', async ({page})=>{
    await page.login.visit()
    await page.login.submit('', 'pwd123')
    await page.login.alertHaveText('Campo obrigatório')

})

test('não deve logar com senha vazia', async ({page})=>{
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    await page.login.alertHaveText('Campo obrigatório')

})

test('não deve logar com ambos os campos vazios', async ({page})=>{
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

})