var webdriverio = require('webdriverio');

describe('Collagify app', function() {

    var client = {};
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;

    beforeEach(function() {
        client = webdriverio.remote({ desiredCapabilities: {browserName: 'firefox'} });
        client.init();
    });

    it('should have', function(done) {
        client
            .url('http://collagify.herokuapp.com/')
            .getElementSize('.main-logo img', function(err, result) {
                expect(err).toBeFalsy();
                expect(result.height).toBe(100);
                expect(result.width).toBe(100);
            })
            .getTitle(function(err, title) {
                expect(err).toBeFalsy();
                expect(title).toBe('Collage App');
            })
            .getCssProperty('.main-title', 'color', function(err, color){
                expect(err).toBeFalsy();
                expect(color.parsed.hex).toBe('#fe6962');
            })
            .call(done);
    },9999999);

    afterEach(function(done) {
        client.end(done);
    });
});