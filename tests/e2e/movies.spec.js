const { test } = require('../support');

const data = require('../support/fixtures/movies.json')

const {executeSql} = require('../support/database')


test('cadastrar novo filme', async ({page}) =>{

    const movie = data.create

    executeSql(`DELETE from movies where title = '${movie.title}' `)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title,movie.overview,movie.company,movie.release_year)

    await page.toast.containText("Cadastro realizado com sucesso!")

})