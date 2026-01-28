import supertest from 'supertest'
import {buildApp} from "../../app.js";
import {ROUTES} from "../../shared/const/routes.js";


describe('GET /api/heartbeat', () => {
  const app = buildApp({logger: false})

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return status ok', async () => {
    const response = await supertest(app.server)
      .get(ROUTES.HEARTBEAT)
      .expect(200)

    expect(response.body).toHaveProperty("message", 'Heartbeat is OK!')
  })
})

