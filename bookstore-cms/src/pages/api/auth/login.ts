import { login } from '@/modules/auth/service';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export default async function POST(req: NextApiRequest, resp: NextApiResponse) {
  console.log('POST LOGIN');
  const data = await login(req.body);
  const {
    access_token,
    refresh_token,
    expires_in: maxAge,
  } = data?.data?.session || {};

  setCookie('access_token', access_token, {
    req,
    res: resp,
    maxAge,
  });
  setCookie('refresh_token', refresh_token, {
    req,
    res: resp,
    maxAge,
  });

  return resp.status(200).json(data.data);
}
