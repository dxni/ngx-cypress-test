
function selectGroupMenuItem(groupName){

    cy.contains('a',groupName).then(menu=>{
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr=>{
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })

    })

}



export class NavigationPageForm{

    stepperPage(){
        selectGroupMenuItem('Layout')
        cy.contains('Stepper').click()
    }

    accordionPage(){
        selectGroupMenuItem('Layout')
        cy.contains('Accordion').click()
    }

    formLayoutsPage (){
                
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datePickerPage (){
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    dialogPage (){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Dialog').click()
    }

    tooltipPage (){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    smartTablePage (){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

}

export const navigateTo = new NavigationPageForm()