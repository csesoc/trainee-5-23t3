import { PasswordInput } from "@mantine/core";
import DrunkMeter from "../components/drunkMeter";

export default function HomePage() {
  return (
    <>
      <DrunkMeter progress={10}/>
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