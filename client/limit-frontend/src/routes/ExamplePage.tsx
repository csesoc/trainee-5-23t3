import { Autocomplete, ColorSwatch, Group } from "@mantine/core";

export default function ExamplePage() {
    return (
        <>
            <h2>
                This is a funny example Page
            </h2>
            <Autocomplete
                label="Your favorite library"
                placeholder="Pick value or enter anything"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Group>
                <ColorSwatch color="#009790" />
                <ColorSwatch color="rgba(234, 22, 174, 0.5)" />
                <ColorSwatch color="var(--mantine-color-orange-5)" />
            </Group>
        </>
    )
}