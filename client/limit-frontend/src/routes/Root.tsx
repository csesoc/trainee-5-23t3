import "@mantine/core/styles.css";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <AppShell
    >

      <AppShell.Main><Outlet/></AppShell.Main>
    </AppShell>
  )
}