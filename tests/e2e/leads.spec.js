import { test, expect } from '../support';
const { faker} = require('@faker-js/faker')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName,leadEmail)
  await page.toast.containText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
});

test('não deve cadastrar quando o email ja existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName,leadEmail)
  await page.toast.containText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.')
});

test('não deve cadastrar um lead na fila de espera com email incorreto', async ({ page }) => { 
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Felipe Iandoli','fpiandoli.gmail.com')
  await page.landing.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('','fpiandoli@gmail.com')
  await page.landing.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Felipe Iandoli','')
  await page.landing.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('','')
  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});



