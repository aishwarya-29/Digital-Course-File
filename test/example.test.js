const expect = require('chai').expect;
const request = require('request');

courseInfoDS01 = {"courseID":"DS01","courseName":"Data Structures","credits":4,"deptID":"CSE18"}
describe('Get Course Information Test', () => {
    it('should return course information of DS01', function(done){
        request('http://localhost:3000/api/course/DS01', function(error, response, body) {
            expect(body).to.equal(JSON.stringify(courseInfoDS01));
            done();
        })
    })
});