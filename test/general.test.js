const assert = require('assert');


describe('email-verify', function () {
  this.timeout(20000);

  const verifier = require('../index.js');
  const verifyCodes = verifier.verifyCodes;

  describe('#verify()', () => {
    it('existing email: should respond with an object where success is true', (done) => {
      verifier.verify('support@github.com', (err, info) => {
        assert(info.success);
        assert(info.code === verifyCodes.finishedVerification);
        assert(typeof info.banner === 'string');
        done();
      });
    });
    it('non-existing domain: should respond with an object where success is false', (done) => {
      verifier.verify('admin@klklklklkklklklkl.com', (err, info) => {
        assert(!info.success);
        assert(info.code === verifyCodes.domainNotFound);
        done();
      });
    });
    it('non-existing email: should respond with an object where success is false', (done) => {
      verifier.verify('admin@github.com', (err, info) => {
        assert(!info.success);
        assert(info.code === verifyCodes.finishedVerification);
        done();
      });
    });
    it('badly formed email: should respond with an object where success is false', (done) => {
      verifier.verify('badlyformed##email@email@.com', (err, info) => {
        assert(!info.success);
        assert(info.code === verifyCodes.invalidEmailStructure);
        done();
      });
    });
    it('short timeout: should respond with an object where success is false', (done) => {
      verifier.verify('support@github.com', { timeout: 1, port: 25 }, (err, info) => {
        assert(!info.success);
        assert(info.code === verifyCodes.SMTPConnectionTimeout);
        done();
      });
    });
    it('long timeout: should respond with an object where success is true', (done) => {
      verifier.verify('support@github.com', { timeout: 5000, port: 25 }, (err, info) => {
        assert(info.success);
        assert(info.code === verifyCodes.finishedVerification);
        done();
      });
    });
    it('bad smtp port: should respond with an object where success is false', (done) => {
      verifier.verify('admin@github.com', { timeout: 5000, port: 6464 }, (err, info) => {
        assert(!info.success);
        assert(info.code === verifyCodes.SMTPConnectionTimeout);
        done();
      });
    });
  });
});
