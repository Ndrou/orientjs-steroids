var should = require('should');
var OrientDB = require('../index');

describe('Array', function () {

    before(function () {
        server = new OrientDB({
            host: '127.0.0.1',
            port: 2424
        });

        db = server.use({
            name: 'GratefulDeadConcerts',
            username: 'admin',
            password: 'admin'
        });

    });

    it('should load templates', function () {

        db.loadTemplates({
            path: __dirname + '/templates'
        });

    });

    it('should test simple query', function () {
        return db.queryTemplate('simple/select-query', {returnType: true}, {
                params: {
                    type: 'song'
                }
            })
            .then(function (results) {

                results.should.be.instanceof(Array);

                results.forEach(function (result) {
                    result['@rid'].cluster.should.be.eql(-2);
                    result.type.should.be.eql('song');
                });

            })
    });


    it('should test batch query', function () {

        return db.batchQueryTemplate('batch/test-batch', null, {
                params: {
                    type1: 'song',
                    type2: 'artist'
                }
            })
            .then(function (results) {

                results.should.be.instanceof(Array);

                results.forEach(function(result){
                    result.should.have.property('type').and.eql('artist');
                });

            })


    });
});