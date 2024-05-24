import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix! Using Vite and Cloudflare!',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { message: 'Hello from loader data!' };
};

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log('Message from loader data:', message);
  }, [message]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      <ul>
        <li>
          <a
            target='_blank'
            href='https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/'
            rel='noreferrer'
          >
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
