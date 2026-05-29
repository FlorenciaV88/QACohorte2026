describe('Checkout - Sauce-Demo', ()=>{

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include','/inventory.html')
        cy.get('.app_logo').should('have.text', 'Swag Labs')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]')
        .should('be.visible')
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '1')
       
    })

    it('Completar checkout con datos válidos', ()=>{
        //cy.checkout ('test 13')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url().should('include','/cart.html')
        cy.get('[data-test="checkout"]').should('be.visible').click()
        cy.url().should('include','/checkout-step-one.html')
        cy.get('[data-test="continue"]').should('be.visible')
        cy.get('[data-test="firstName"]').type('Juan')
        cy.get('[data-test="lastName"]').type('Perez')
        cy.get('[data-test="postalCode"]').type('5000')
        cy.get('[data-test="continue"]').click()
        cy.url().should('include','/checkout-step-two.html')
        cy.get('[data-test="finish"]').click()
        cy.url().should('include', '/checkout-complete.html')
        cy.get('[data-test="complete-header"]').should('contain', "Thank you for your order!")
        cy.get('[data-test="complete-text"]').should('contain', "Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        cy.get('[data-test="back-to-products"]').should('be.visible')        
    })

    it('Checkout sin completar datos obligatorios', ()=>{
        //cy.checkout ('test 14')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url().should('include','/cart.html')
        cy.get('[data-test="checkout"]').should('be.visible').click()
        cy.url().should('include','/checkout-step-one.html')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', "Error: First Name is required")  
    })

})