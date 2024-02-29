import { ParseSourceSpan } from "@angular/compiler"


export class FormLayoutsPage{

    submitInLineFormWithNameAndEmail(name, email){
        cy.contains('nb-card','Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit()
        } )
    }

    submitBasicWithEmailAndPassword(email, pass){
        cy.contains('nb-card','Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(pass)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit()
        } )
    }

}

export const onFormLayoutsPage = new FormLayoutsPage()

