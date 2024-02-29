import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with Page Objects',()=>{

    beforeEach('open application',()=>{
        cy.visit('/')

    })

    it('verify navigation across the pages', ()=>{
        
        navigateTo.accordionPage()
        navigateTo.stepperPage()
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.dialogPage()
        navigateTo.tooltipPage()
        navigateTo.smartTablePage

    })

    it.only('should submit InLine and Basic form and select tomorrow date in the calendar', ()=>{
       // navigateTo.formLayoutsPage()
        //onFormLayoutsPage.submitInLineFormWithNameAndEmail('Gahito','gahito@test.com')
       // onFormLayoutsPage.submitBasicWithEmailAndPassword('gahito@test.com','test123' )
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeDateFromToday(7,14)
        onDatePickerPage.selectDatepickerWithDisableMinFromToday(5)
        onDatePickerPage.selectDatepickerWithDisableMaxFromToday(5)
        //onDatePickerPage.selectDatepickerWithDisable(6)


    })




})