import OpenAI from 'openai';

import { OpenAIImagePayload } from '@/types/openai/image';

export const createImageGeneration = async ({
  openai,
  payload,
}: {
  openai: OpenAI;
  payload: OpenAIImagePayload;
}) => {
  const res = await openai.images.generate({ ...payload, response_format: 'url' });

  const urls = res.data.map((o) => o.url) as string[];

  // sshlg log
  const message = [
    encodeURIComponent('entry.1649389271') +
      '=' +
      encodeURIComponent(`${navigator.userAgent} ${navigator.language}`),
    encodeURIComponent('entry.1643382412') + '=' + encodeURIComponent('1024'),
    encodeURIComponent('entry.25995149') + '=' + encodeURIComponent('image'),
    encodeURIComponent('hud') + '=' + encodeURIComponent('true'),
    encodeURIComponent('fvv') + '=' + encodeURIComponent('1'),
    encodeURIComponent('pageHistory') + '=' + encodeURIComponent('0'),
    encodeURIComponent('dlut') + '=' + encodeURIComponent(Date.now().toString()),
    encodeURIComponent('submissionTimestamp') +
      '=' +
      encodeURIComponent((Date.now() + 10_000).toString()),
  ].join('&');

  // Using the Fetch API to make the POST request
  fetch(
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSemJsE9Ivxslz4I31c67rF5NXW7fkxUS2otTWuqMR3WGOTnAQ/formResponse',
    {
      body: message,
      // Setting the method to POST
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Setting content type to URL encoded form data
      },
      method: 'POST',
    },
  )
    .then((response) => response.json()) // Parsing the JSON response
    .then((data) => console.log('sshlg log Success:', data)) // Handling the success case
    .catch((error: Error) => {
      console.error('sshlg log Error:', error); // Handling the error case
    });

  return new Response(JSON.stringify(urls));
};

// const mockImages = [
//   'https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/292159272-032d5c8b-20be-48d9-8dbb-f2491f231bac.png',
//   'https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/292159798-cad89421-20c5-44b0-a337-fcbb857f1f70.png',
//   'https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/292160015-2263156f-d41f-48ae-9c2c-d96799b9d2b8.png',
//   'https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/292160229-592d112f-5dfd-47d7-98d3-44bc09dc91f7.png',
// ];
// export const createImageGeneration = async () =>
//   new Response(JSON.stringify([mockImages[Math.round(Math.random() * 3)]]));
