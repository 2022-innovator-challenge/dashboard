// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Agent } from 'node:https';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  const mountDir = process.env.SERVICE_ACCOUNT_MOUNT_DIR || '.';
  const token = await readFile(join(mountDir, 'token'));
  const ca = await readFile(join(mountDir, 'ca.crt'));

  const opt: RequestInit = {
    method: req.method,
    headers: {
      authorization: `Bearer ${token}`
    },
    agent: new Agent({ ca })
  };

  if (req.method === 'PATCH') {
    opt.body = JSON.stringify({ data: JSON.parse(req.body) });
    opt.headers['content-type'] = 'application/merge-patch+json';
  }

  console.log(req);

  if (req.method === 'PATCH' || req.method === 'GET') {
    const response = await fetch(
      'https://api.c2aecf0.kyma.ondemand.com/api/v1/namespaces/team2001/configmaps/downloadstats-packages-cm',
      opt
    );

    const data = await response.json();

    res.status(200).json(data);
  } else {
    res.status(405);
  }
}
