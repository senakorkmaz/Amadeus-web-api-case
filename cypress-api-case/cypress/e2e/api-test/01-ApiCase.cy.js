/// <reference types="cypress" />
import data from '../../fixtures/data.json';

describe('Api test',()=>{
    
    let baseUrl = data["BASEURL"]
    it('Check api response',()=>{
        cy.request({
            method:'GET',
            url: baseUrl
        }).then((res)=>{
            //Check status
            expect(res.status).to.equal(200)

            //Check Headers
            expect(res.headers['content-type']).to.include('application/json');

            //Check data
            cy.wrap(res.body["data"]).each((fly) =>{
                expect(fly).to.have.property('id').that.is.a('number').and.is.not.NaN;
                expect(fly).to.have.property('from').that.is.a('string').and.is.not.empty;
                expect(fly).to.have.property('to').that.is.a('string').and.is.not.empty;
                expect(fly).to.have.property('date').that.is.a('string').and.is.not.empty;
            })

        })
    })
})