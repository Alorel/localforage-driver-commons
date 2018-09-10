import {expect} from 'chai';
import {executeCallback} from '../src';

describe('executeCallback', () => {

  it('should be a no-op without a callback', () => {
    expect(executeCallback(Promise.resolve())).to.be.undefined;
  });

  it('should run a callback on success', (cb: any) => {
    executeCallback(Promise.resolve('foo'), (err: any, result: any) => {
      try {
        expect(err).to.be.null;
        expect(result).to.eq('foo');
        cb();
      } catch (e) {
        cb(e);
      }
    });
  });

  it('should run a callback on error', (cb: any) => {
    const rError = new Error('bar');
    const rejected = Promise.reject(rError);

    executeCallback(rejected, (err: any, result: any) => {
      try {
        expect(err === rError).to.be.true;
        expect(result).to.be.undefined;
        cb();
      } catch (e) {
        cb(e);
      }
    });
  });
});
