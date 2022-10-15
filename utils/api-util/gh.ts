// Only the following are supported
//https://api.github.com/repos/sap/cloud-sdk-js/pulls
//https://api.github.com/repos/sap/cloud-sdk-js/issues
//https://api.github.com/repos/sap/cloud-sdk-js/stargazers

import type { NextApiRequest, NextApiResponse } from 'next';

export function validateRequest(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const baseUrl = 'https://api.github.com/repos/sap/cloud-sdk-js';

export function getQueryParams(): URLSearchParams {
  return new URLSearchParams({ per_page: '3' });
}

export function getUrl(
  infoType: string,
  query: Record<string, string> = {}
): string {
  const queryParams = new URLSearchParams({ per_page: '3', ...query });
  return `${baseUrl}/${infoType}?${queryParams.toString()}`;
}
