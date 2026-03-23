// Integration tests: GET /api/budget integrated with the real lib/budget.js
// lib/budget is NOT mocked here to test logic. Only the database and auth are mocked here.

jest.mock('@/lib/auth', () => ({ authenticate: jest.fn() }))
jest.mock('@/lib/db', () => ({ query: jest.fn() }))

const { testApiHandler } = require('next-test-api-route-handler')
const { authenticate } = require('@/lib/auth')
const db = require('@/lib/db')
const budgetHandler = require('@/app/api/budget/route')

const authorizedUser = { id: 'uid', email: 'a@b.com' }

beforeEach(() => {
  authenticate.mockClear()
  db.query.mockClear()
  authenticate.mockResolvedValue({ user: authorizedUser })
})

describe('GET /api/budget (integration: route handler + lib/budget)', () => {
  it('normalizes the month before querying: db receives YYYY-MM-01 regardless of input day', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{ month: '2026-03-01', monthly_limit: '300.00', notified: false }],
    })

    await testApiHandler({
      appHandler: budgetHandler,
      url: 'http://localhost/api/budget?month=2026-03-15',
      async test({ fetch }) {
        const res = await fetch()
        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({ month: '2026-03-01', monthly_limit: '300.00', notified: false })
        // real normalizeMonth ran: db got '2026-03-01', not the raw '2026-03-15'
        expect(db.query).toHaveBeenCalledWith(expect.any(String), ['uid', '2026-03-01'])
      },
    })
  })

  // Required error tests in integration testing
  it('short-circuits at normalizeMonth and never reaches the db for an invalid month', async () => {
    await testApiHandler({
      appHandler: budgetHandler,
      url: 'http://localhost/api/budget?month=bad-month',
      async test({ fetch }) {
        const res = await fetch()
        expect(res.status).toBe(400)
        expect((await res.json()).error).toBe('Valid month is required')
        expect(db.query).not.toHaveBeenCalled()
      },
    })
  })

  it('returns 500 when the database throws, propagated through getMonthlyBudget', async () => {
    db.query.mockRejectedValueOnce(new Error('connection refused'))

    await testApiHandler({
      appHandler: budgetHandler,
      url: 'http://localhost/api/budget?month=2026-03-01',
      async test({ fetch }) {
        const res = await fetch()
        expect(res.status).toBe(500)
        expect((await res.json()).error).toBe('Failed to fetch budget')
      },
    })
  })
})
