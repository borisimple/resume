import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const source = readFileSync(new URL('../public/service-worker.js', import.meta.url), 'utf8')
const scope = 'https://borisimple.github.io/resume/'

function setup(urls, hasCache = true) {
  const listeners = new Map()
  const calls = []
  const remaining = urls.map(url => ({ url }))
  const cache = {
    keys: async () => remaining.slice(),
    delete: async request => { calls.push(['delete-entry', request.url]); remaining.splice(remaining.indexOf(request), 1); return true },
  }
  const self = {
    addEventListener: (name, handler) => listeners.set(name, handler),
    skipWaiting: async () => calls.push(['skip-waiting']),
    registration: { scope, unregister: async () => calls.push(['unregister']) },
    clients: {
      claim: async () => calls.push(['claim']),
      matchAll: async options => {
        assert.equal(options.type, 'window')
        return [scope, 'https://borisimple.github.io/another-app/'].map(url => ({
          url, navigate: async target => calls.push(['navigate', target]),
        }))
      },
    },
  }
  const caches = {
    has: async name => { assert.equal(name, 'sw-cache'); return hasCache },
    open: async name => { assert.equal(name, 'sw-cache'); calls.push(['open']); return cache },
    delete: async name => calls.push(['delete-cache', name]),
  }
  runInNewContext(source, { self, caches })
  const dispatch = async name => {
    let completion
    listeners.get(name)({ waitUntil: promise => { completion = promise } })
    assert.ok(completion)
    await completion
  }
  return { dispatch, calls, remaining }
}

test('retires old registration and reloads only portfolio clients', async () => {
  const state = setup([scope, scope + 'service-worker.js', 'https://borisimple.github.io/another-app/'])
  await state.dispatch('install')
  await state.dispatch('activate')
  assert.deepEqual(state.remaining.map(request => request.url), ['https://borisimple.github.io/another-app/'])
  assert.ok(state.calls.some(call => call[0] === 'unregister'))
  assert.deepEqual(state.calls.filter(call => call[0] === 'navigate'), [['navigate', scope]])
  assert.ok(!state.calls.some(call => call[0] === 'delete-cache'))
})

test('removes old cache when it contains only portfolio entries', async () => {
  const state = setup([scope])
  await state.dispatch('activate')
  assert.equal(state.remaining.length, 0)
  assert.deepEqual(state.calls.find(call => call[0] === 'delete-cache'), ['delete-cache', 'sw-cache'])
})

test('does not create a cache when no legacy cache exists', async () => {
  const state = setup([], false)
  await state.dispatch('activate')
  assert.ok(!state.calls.some(call => call[0] === 'open'))
  assert.ok(state.calls.some(call => call[0] === 'unregister'))
})
