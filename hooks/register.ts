import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

const fortuneIndex = atom({ plugin: 'spinner-fortune', key: 'fortuneIndex' } as const, null)

const FORTUNES = [
  'Works on my machine',
  'It compiled, ship it',
  'Deleting is the real refactor',
  'The bug was a feature of yesterday',
  'Cache invalidation, naming, off-by-one',
  'A green test proves nothing alone',
  'Read the error message. All of it',
  'The fix is always smaller than the fear',
  'Comments lie, code argues back',
  'Simplicity is a decision, not an accident',
  'Yesterday\'s hack is today\'s legacy system',
  'The stack trace knows more than you think',
  'Premature optimization, the classic villain',
  'Version control is a time machine for cowards',
  'Nothing is temporary like a temp fix',
  'The real bug was the assumptions we made',
  'Grep before you grieve',
  'Rubber ducks keep better secrets than Slack',
]

export const register: Register = on => {
  // Picked once, before the first prompt, so every Spinner draw this
  // session reads the same fortune instead of a new one each turn.
  on('session.start', async ($, e, next) => {
    const idx = Math.floor(Math.random() * FORTUNES.length)
    await update($, fortuneIndex, () => idx)
    return next(e)
  })

  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    const { value } = await read($, fortuneIndex)
    if (value === null || value === undefined) return next(e)

    return next({
      ...e,
      props: { ...e.props, message: FORTUNES[value] },
    })
  })
}
