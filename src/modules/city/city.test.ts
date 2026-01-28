import { vi } from 'vitest'

// 1️⃣ СНАЧАЛА mock (самый верх файла)
vi.mock('./city.service.js', () => ({
  getAllCities: vi.fn(),
  getCityById: vi.fn(),
  createCity: vi.fn(),
  updateCity: vi.fn(),
  deleteCity: vi.fn()
}))

import supertest from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { buildApp } from '../../app.js'
import { ROUTES } from '../../shared/const/routes.js'

import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} from './city.service.js'

describe('City API', () => {
  const app = buildApp({ logger: false })

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // ---------------- GET /city ----------------
  it('GET /city → should return all cities', async () => {
    vi.mocked(getAllCities).mockResolvedValue([
      { id: '1', name: 'Stockholm' },
      { id: '2', name: 'Gothenburg' }
    ])

    const res = await supertest(app.server)
      .get(ROUTES.CITY)
      .expect(200)

    expect(res.body).toHaveLength(2)
    expect(res.body[0].name).toBe('Stockholm')
  })

  // ---------------- GET /city/:id ----------------
  it('GET /city/:id → should return city by id', async () => {
    vi.mocked(getCityById).mockResolvedValue({
      id: '1',
      name: 'Stockholm'
    })

    const res = await supertest(app.server)
      .get(`${ROUTES.CITY}/1`)
      .expect(200)

    expect(res.body).toEqual({
      id: '1',
      name: 'Stockholm'
    })
  })

  // ---------------- POST /city ----------------
  it('POST /city → should create city', async () => {
    vi.mocked(createCity).mockResolvedValue({
      id: '3',
      name: 'Uppsala'
    })

    const res = await supertest(app.server)
      .post(ROUTES.CITY)
      .send({ name: 'Uppsala' })
      .expect(201)

    expect(res.body.message).toBe('Successfully created city')
    expect(res.body.result.name).toBe('Uppsala')
  })

  // ---------------- PUT /city/:id ----------------
  it('PUT /city/:id → should update city', async () => {
    vi.mocked(updateCity).mockResolvedValue({
      id: '1',
      name: 'New Stockholm'
    })

    const res = await supertest(app.server)
      .put(`${ROUTES.CITY}/1`)
      .send({ name: 'New Stockholm' })
      .expect(200)

    expect(res.body.message).toContain('Successfully updated city')
    expect(res.body.result.name).toBe('New Stockholm')
  })

  // ---------------- DELETE /city/:id ----------------
  it('DELETE /city/:id → should delete city', async () => {
    vi.mocked(deleteCity).mockResolvedValue({
      id: '1',
      name: 'Stockholm'
    })

    const res = await supertest(app.server)
      .delete(`${ROUTES.CITY}/1`)
      .expect(200)

    expect(res.body.message).toContain('Successfully delete city')
  })
})
