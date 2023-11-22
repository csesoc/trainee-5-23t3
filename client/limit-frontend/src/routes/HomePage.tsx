import { PasswordInput } from "@mantine/core";

export default function HomePage() {
  return (
    <>
      <PasswordInput
        placeholder="Password"
        label="Password"
        description="Password must include at least one letter, number and special character"
        radius="md"
        required
      />
    </>
  );
}