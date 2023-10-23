import {expect} from 'chai';
import {getCallback} from '../src';

function noop() {
  // really is a noop, mate
}

describe('getCallback', () => {
  it('should return undefined with no args', () => {
    expect(getCallback([])).to.be.undefined;
  });

  it('should return undefined when the last arg is not a fn', () => {
    expect(getCallback([noop, 'foo'])).to.be.undefined;
  });

  it('should return callback if last arg is fn', () => {
    expect(getCallback(['foo', noop])).to.eq(noop);
  });
});
