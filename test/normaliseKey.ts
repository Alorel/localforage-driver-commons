import {expect} from 'chai';
import {normaliseKey} from '../src';

function noop() {
  // nooping away, mate
}

describe('normaliseKey', () => {
  let origConsoleWarn: any;

  before('noopify console.warn', () => {
    origConsoleWarn = console.warn;
    console.warn = noop;
  });

  after('de-noopify console.warn', () => {
    console.warn = origConsoleWarn;
  });

  it('string key', () => {
    expect(normaliseKey('foo')).to.eq('foo');
  });

  it('number key', () => {
    expect(normaliseKey(1)).to.eq('1');
  });
});
