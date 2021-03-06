const Workshop = require('../workshop.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Workshop', () => {
    it('should throw an error if no args', () => {
        const workshop = new Workshop({});

        workshop.validate(err => {
            expect(err.errors.name).to.exist;
            expect(err.errors.concertId).to.exist;
        });
    });

    it('should throw an error if args are not strings', () => {
        const cases = [{}, []];

        for (let name of cases) {
            const workshop = new Workshop({ name, name });
            
            workshop.validate(err => {
                expect(err.errors.name).to.exist;
                expect(err.errors.concertId).to.exist;
            });
        }
    });
});