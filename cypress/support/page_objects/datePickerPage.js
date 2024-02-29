
function selectDayFromCurrent(day){
            
    let date =new Date()
    date.setDate(date.getDate()+ day)
    let futureDay = date.getDate()
    let futureMonth=date.toLocaleDateString('en-US', {month:'short'})
    let futureYear= date.getFullYear()
    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
    
    cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date') .then(dateAttribute => {
        if (!dateAttribute.includes(futureMonth)|| !dateAttribute.includes(futureYear)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        }else{
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateToAssert
}

export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){
        
        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value',dateToAssert)

        })

    }

    selectDatepickerWithRangeDateFromToday(firstDay, secondDay){
        
        cy.contains('nb-card','Datepicker With Range').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssertFirst = selectDayFromCurrent(firstDay)
            const dateToAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateToAssertFirst+ ' - '+dateToAssertSecond

            cy.wrap(input).invoke('prop','value').should('contain',finalDate)
            cy.wrap(input).should('have.value',finalDate)

        })

    }

    selectDatepickerWithDisableMaxFromToday(min){
        
        cy.contains('nb-card','Datepicker With Disabled Min Max Values').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssertMax = selectDayFromCurrent(min)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssertMax)
            cy.wrap(input).should('have.value',dateToAssertMax)

        })

    }

    selectDatepickerWithDisableMinFromToday(min){
        
        cy.contains('nb-card','Datepicker With Disabled Min Max Values').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssertMin = selectDayFromCurrent(-min)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssertMin)
            cy.wrap(input).should('have.value',dateToAssertMin)

        })

    }

    // selectDatepickerWithDisable(dayDisable){
        
    //     cy.contains('nb-card','Datepicker With Disabled Min Max Values').find('input').then(input =>{
    //         cy.wrap(input).click()
    //         const dateToAssertDisable = selectDayFromCurrent(dayDisable)
    //         cy.wrap(input).invoke('prop',dayDisable).should('have.class','disabled')
    //         //cy.wrap(input).should('be.disabled')

    //     })

    // }

}

export const onDatePickerPage = new DatepickerPage()