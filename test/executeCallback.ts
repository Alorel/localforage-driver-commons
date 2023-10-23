import {expect} from 'chai';
import {executeCallback} from '../src';

//tslint:disable:no-use-of-empty-return-value

describe('executeCallback', () => {

  it('should run a callback on success', cb => {
    executeCallback(Promise.resolve('foo'), (err, result) => {
      try {
        expect(err).to.eq(null);
        expect(result).to.eq('foo');
        cb();
      } catch (e) {
        cb(e);
      }
    });
  });

  it('should run a callback on error', cb => {
    const rError = new Error('bar');
    const rejected = Promise.reject(rError);

    executeCallback(rejected, (err: any, result: any) => {
      try {
        expect(err === rError).to.eq(true);
        expect(result).to.eq(null);
        cb();
      } catch (e) {
        cb(e);
      }
    });
  });
});
