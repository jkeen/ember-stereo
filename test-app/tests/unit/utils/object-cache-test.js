import { module, test } from 'qunit';
import ObjectCache from 'ember-stereo/-private/utils/object-cache';

module('Unit | Utility | object-cache', function () {
  test('stores values for object identifiers', function (assert) {
    let objectCache = new ObjectCache();

    let key1 = { whoAmI: 'the world may never know' };
    let key2 = { foo: 'bar', baz: 123 };
    let val1 = { value: 1 };
    let val2 = 'hello';

    assert.false(objectCache.has(key1));
    assert.false(objectCache.has(key2));
    assert.equal(objectCache.find(key1), null);
    assert.equal(objectCache.find(key2), null);

    objectCache.store(key1, val1);
    objectCache.store(key2, val2);

    assert.ok(objectCache.has(key1));
    assert.ok(objectCache.has(key2));
    assert.deepEqual(objectCache.find(key1), val1);
    assert.deepEqual(objectCache.find(key2), val2);

    objectCache.remove(key1);
    objectCache.remove(key2);

    assert.false(objectCache.has(key1));
    assert.false(objectCache.has(key2));
    assert.equal(objectCache.find(key1), null);
    assert.equal(objectCache.find(key2), null);
  });

  test('stores values for string identifiers', function (assert) {
    let objectCache = new ObjectCache();

    let key1 = 'whoAmI';
    let key2 = 'foo';
    let val1 = { value: 1 };
    let val2 = 'hello';

    assert.false(objectCache.has(key1));
    assert.false(objectCache.has(key2));
    assert.equal(objectCache.find(key1), null);
    assert.equal(objectCache.find(key2), null);

    objectCache.store(key1, val1);
    objectCache.store(key2, val2);

    assert.ok(objectCache.has(key1));
    assert.ok(objectCache.has(key2));
    assert.deepEqual(objectCache.find(key1), val1);
    assert.deepEqual(objectCache.find(key2), val2);

    objectCache.remove(key1);
    objectCache.remove(key2);

    assert.false(objectCache.has(key1));
    assert.false(objectCache.has(key2));
    assert.equal(objectCache.find(key1), null);
    assert.equal(objectCache.find(key2), null);
  });

  test('stores both at the same time', function (assert) {
    let objectCache = new ObjectCache();

    let key1 = 'whoAmI';
    let key2 = { foo: 'bar', baz: 123 };
    let val1 = { value: 1 };
    let val2 = 'hello';

    assert.false(objectCache.has(key1));
    assert.false(objectCache.has(key2));
    assert.equal(objectCache.find(key1), null);
    assert.equal(objectCache.find(key2), null);

    objectCache.store(key1, val1);
    objectCache.store(key2, val2);

    assert.ok(objectCache.has(key1));
    assert.ok(objectCache.has(key2));
    assert.deepEqual(objectCache.find(key1), val1);
    assert.deepEqual(objectCache.find(key2), val2);

    objectCache.remove(key1);
    objectCache.remove(key2);

    assert.false(objectCache.has(key1));
    assert.false(objectCache.has(key2));
    assert.equal(objectCache.find(key1), null);
    assert.equal(objectCache.find(key2), null);
  });
});
