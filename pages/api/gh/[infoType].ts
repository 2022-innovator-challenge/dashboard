// Only the following are supported
//https://api.github.com/repos/sap/cloud-sdk-js/pulls
//https://api.github.com/repos/sap/cloud-sdk-js/issues
//https://api.github.com/repos/sap/cloud-sdk-js/stargazers

import type { NextApiRequest, NextApiResponse } from 'next';

import fetch, { RequestInit } from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  const {
    query: { infoType },
    method
  } = req;

  if (!['pulls', 'issues', 'stargazers'].includes(infoType as string)) {
    res.status(400).end(`Info type ${infoType} not allowed.`);
  }

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  const opt: RequestInit = {
    method: req.method,
    headers: {}
  };

  const response = await fetch(
    `https://api.github.com/repos/sap/cloud-sdk-js/${infoType}?per_page=3`,
    opt
  );

  const data = (await response.json()) as Record<string, string>;

  res.status(200).json(data);
}
