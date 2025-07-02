import express from 'express';
import request from 'supertest';

const app = express();
app.get('/ping', (req, res) => res.send('pong'));

describe('Ping route', () => {
  it('should return pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.text).toBe('pong');
  });
}); 