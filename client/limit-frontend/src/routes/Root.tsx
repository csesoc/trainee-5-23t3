import "@mantine/core/styles.css";
import { AppShell, Burger, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  const [opened, { toggle }] = useDisclosure();
  const [token, setToken] = React.useState<null | string>(null);

  console.log('Token:' + token);
  // Get token in local storage
  React.useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken !== token) {
      setToken(localToken);
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex mih={60} mx="lg" justify="space-between" align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>

          { token ? (
            <>
              <Button 
                variant="gradient" 
                gradient={{ from: 'red', to: 'orange', deg: 90 }}
                onClick={logout}>
                Logout
              </Button>
            </>
            ) : (
              <>
                <Link to="/Login">
                  <Button
                    variant="gradient" 
                    gradient={{ from: 'red', to: 'orange', deg: 90 }}>
                      Login
                  </Button>
                </Link>
              </>
            )
          }
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main><Outlet /></AppShell.Main>
    </AppShell>
  )
}