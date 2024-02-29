///<reference types ="cypress"/>



describe ('First Test suite', ()=>{

    it ('First test',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tab name
        cy.get('input')
                //by ID
        cy.get('#inputEmail1')

        //by Class value
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[fullwidth]')

        // by attribute and value
        cy.get('[placeholder="Email"]')

        // by entire Class  value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attribute
        cy.get('[placeholder="Email"][fullwidth]')

        // by tag= input ,attribute id = #inputEmail1 and  class =.input-full-width
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // by cypress test id
        cy.get('[data-cy="imputEmail1"]')
    })

    it ('Second test', ()=>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // Theory
        // get() - find elements on the page by locator globally
        // find () - find child elemnets  by locator
        // contains () - find HTML text and by text and locator

        cy.contains('Sign in')
        cy.contains('[status="warning"]','Sign in')
        cy.contains('nb-card','Horizontal form').find('button')
        cy.contains('nb-card','Horizontal form').contains('Sign in')
        cy.contains('nb-card','Horizontal form').get('button')



        cy.contains('Submit')
        cy.contains('[status="danger"]','Submit')
        cy.contains('nb-card','Block form').find('button')
        

        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click() //Checked
            .parents('form')
            .find('nb-checkbox')
            .click() //not checked

        cy.get('#exampleInputEmail1')
            .parents('form')
            .find('button')
            .should('contain','Submit')
            .parents('form')
            .find('nb-checkbox')
            .click() //Checked
    })

    it('save subject of the command',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        
        //CANT do THING like this
        // const usingTheGrid = cy.contains('nb-card','Using the Grid')
        //usingTheGrid.find('[for="inputEmail1"]').should('contain','Email')
        //usingTheGrid.find('[for="inputPassword2"]').should('contain','Password')

        //1. Cypress Alias
        cy.contains('nb-card','Using the Grid').as ('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain','Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain','Password')

        //2. Cypress then()  methods
        cy.contains('nb-card','Using the Grid').then(usingTheForm =>{
            cy.wrap(usingTheForm).find('[for="inputEmail1"]').should('contain','Email')
            cy.wrap(usingTheForm).find('[for="inputPassword2"]').should('contain','Password')
        })
        
    })

    it('extracxt text values',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
         cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //2 
        cy.get('[for="exampleInputEmail1"]').then(label=>{
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain','Email address')
        })

        //3 invoke text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text =>{
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain','Email address')

        //4 invoke atribute

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue=>{
            expect(classValue).to.equal('label')
        })

        //5 imvoke propeties
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop','value').then(property=> {  
            expect (property).to.equal('test@test.com')    
        }) 
        cy.get('#exampleInputEmail1').invoke('prop','value').should('contain','test@test.com')
    })

    // Checkboxes and Radio Buttons #24

    it('radio button',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons=>{
            cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force:true}).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')

        })
    })

    it('checkboxes',() =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //cy.get('[type="checkbox"]').uncheck({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})
    })

    //Web Date Picker #25 and #26

    it('Date Picker',() =>{
        
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
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssert = selectDayFromCurrent(20)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value',dateToAssert)

        })
        
    })

    // #27 list and drop down 
    it.only('List and dropdown',() =>{

        cy.visit('/')

        //1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')


        // 2

        cy.get('nav nb-select').then(dropDown =>{

            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each((listItem, index) =>{
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if(index < 3){
                    cy.wrap(dropDown).click()
                }
            })
        })        

    })

    
})
