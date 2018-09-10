import {expect} from 'chai';
import {getKeyPrefix} from '../src';

describe('getKeyPrefix', () => {
  it('non-default name', () => {
    const p = getKeyPrefix({name: 'foo'}, {storeName: 'bar'});

    expect(p).to.eq('foo/bar');
  });

  it('non-default storeName', () => {
    const p = getKeyPrefix({storeName: 'qux'}, {name: 'baz'});

    expect(p).to.eq('baz/qux');
  });
});
