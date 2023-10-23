import {expect} from 'chai';
import {clone} from '../src';

describe('clone', () => {
  const base = {foo: {bar: {qux: 'baz', date: new Date()}}};
  const cloned = clone(base);

  it('foo.bar should not be ===', () => {
    expect(base.foo.bar === cloned.foo.bar).to.eq(false);
  });
  it('foo should not be ===', () => {
    expect(base.foo === cloned.foo).to.eq(false);
  });
  it('whole object should not be ===', () => {
    expect(base === cloned).to.eq(false);
  });

  it('Objects should be deeply equal', () => {
    expect(base).to.deep.eq(cloned);
  });
});
