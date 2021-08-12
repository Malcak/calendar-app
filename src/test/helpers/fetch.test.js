import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('test on fetch helpers', () => {
  let token = '';

  test('should be a correct response with no token in the request', async () => {
    const resp = await fetchWithoutToken(
      'users/login',
      { email: 'test@example.com', password: 'Test123456$' },
      'POST'
    );
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);

    token = body.data.token;
  });

  test('should be a correct response with token in the request', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchWithToken('events', {});
    const body = await resp.json();

    expect(resp instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
  });
});
