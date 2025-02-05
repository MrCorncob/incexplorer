import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { ArrowNarrowUp } from 'tabler-icons-react';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useWindowScroll } from '@mantine/hooks';
import { AppShell, Header, Footer, MantineProvider, ColorSchemeProvider, ColorScheme, Container, Navbar, Affix, ActionIcon, Transition, Center, Space, Box, Text, Button } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import MainHeader from '~/mainheader';
import { Outlet } from "@remix-run/react";
import MainFooter from "./mainfooter";
import { useEffect, useState } from "react";
import MainNavbar from "./mainnavbar";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Incognito Explorer",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [openedNavBar, setOpenedNavBar] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [fixedFooter, setFixedFooter] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // useHotkeys([['mod+J', () => toggleColorScheme()]]);
  function checkHeight() {
    if (window.innerHeight - 120 > contentHeight) {
      setFixedFooter(true);
    } else {
      setFixedFooter(false);
    }
  }
  useEffect(() => {
    checkHeight()
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link href="/stylesheet.css" rel="stylesheet"></link>
      </head>
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{
            colorScheme,
            fontFamily: "Inter",
            headings: { fontFamily: "Inter" },
            breakpoints: {
              xs: 500,
              sm: 800,
              md: 1000,
              lg: 1275,
              xl: 1440,
            },
          }} withGlobalStyles withNormalizeCSS defaultProps={{
            Container: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1500,
              },
            },
          }}>

            <AppShell
              padding="md"
              navbarOffsetBreakpoint="lg"
              fixed
              navbar={
                <Navbar p="md" hiddenBreakpoint="lg" hidden={!openedNavBar} width={{ sm: 300, lg: 300 }} style={{ backgroundColor: '#1A1A1A' }}>
                  <MainNavbar />
                </Navbar>
              }
              header={<Header fixed={true} height={60} p="xs" style={{ backgroundColor: '#1A1A1A' }}>
                <MainHeader />
              </Header>}
              footer={<Footer height={60} p={0} fixed={fixedFooter} style={{ backgroundColor: '#1A1A1A' }}>{<MainFooter />} </Footer>}
              styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? '#1A1A1A' : "#fff" },
              })}
            >
              <Container size='xl' px={0}>
                <div ref={(divElement) => { checkHeight(); setContentHeight((divElement) ? divElement?.clientHeight : 0) }}><Outlet /></div>
              </Container>
              <Affix position={{ bottom: 70, right: 10 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                  {(transitionStyles) => (
                    <ActionIcon p={2} radius="xl" variant="filled" style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
                      < ArrowNarrowUp />
                    </ActionIcon>
                  )}
                </Transition>
              </Affix>
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html >
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}


export function ErrorBoundary(error: any) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => { };

  let navigate = useNavigate();

  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no! 404</title>
        <Meta />
        <Links />
        <link href="/stylesheet.css" rel="stylesheet"></link>
      </head>
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{
            colorScheme,
            fontFamily: "Inter",
            headings: { fontFamily: "Inter" },

          }} withGlobalStyles withNormalizeCSS>
            <Center style={{ width: '100%', height: '95vh' }}>
              <Box>
                <Text style={{ fontWeight: 500, fontSize: 36, display: 'block', color: '#fff' }}>Oh no! 404</Text>
                <Space h='xl' />
                <Button variant="light" style={{ display: 'table', margin: '0 auto' }} onClick={() => {
                  navigate(`/`, { replace: true });
                  window.location.reload();
                  return
                }}>
                  Go Home
                </Button>
              </Box>
            </Center>
          </MantineProvider>
        </ColorSchemeProvider>
        <Scripts />
      </body>
    </html>
  );
}