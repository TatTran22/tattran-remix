import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/cloudflare';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import stylesheet from '~/styles/tailwind.css?url';
import clsx from 'clsx';
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from 'remix-themes';

import { themeSessionResolver } from '~/sessions/theme.server';
import { MainNav } from './components/main-nav';
import { marketingConfig } from './config/marketing';
import { buttonVariants } from './components/ui/button';
import { cn } from './lib/utils';
import { SiteFooter } from './components/site-footer';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Tat Tran Remix' },
    {
      name: 'description',
      content:
        "Tat Tran's personal website built with Remix, Tailwind CSS, Cloudflare D1",
    },
    {
      property: 'og:title',
      content: 'Tat Tran Remix',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang='en' className={clsx(theme)}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <div className='flex min-h-screen flex-col'>
          <header className='container z-40 bg-background'>
            <div className='flex h-20 items-center justify-between py-6'>
              <MainNav items={marketingConfig.mainNav} />
            </div>
          </header>
          <main className='flex-1'>
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction='/action/set-theme'>
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang='en'>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : 'Unknown Error'}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
