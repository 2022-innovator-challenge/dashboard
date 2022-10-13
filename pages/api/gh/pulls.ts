// Only the following are supported
//https://api.github.com/repos/sap/cloud-sdk-js/pulls
//https://api.github.com/repos/sap/cloud-sdk-js/issues
//https://api.github.com/repos/sap/cloud-sdk-js/stargazers

import type { NextApiRequest, NextApiResponse } from 'next';

import fetch, { RequestInit } from 'node-fetch';
import { getUrl, validateRequest } from '../../api-util/gh';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  validateRequest(req, res);
  if (!res.writableEnded) {
    const opt: RequestInit = {
      method: req.method,
      headers: { accept: 'application/vnd.github+json' }
    };

    const response = await fetch(getUrl('pulls'), opt);

    const data = (await response.json()) as Record<string, string>;

    res.status(200).json(data);
  }
}
