import { Autocomplete, ColorSwatch, Group } from "@mantine/core";
import { useEffect, useState } from "react";

export default function ExamplePage() {
    const [ text, setText ] = useState('')
    useEffect(() => {
          fetch(`http://localhost:6969/`)
          .then(resp => resp.json())
          .then(data => {
           setText(data)
          }).catch(error => {
            console.log(error)
          })
      }, [])

    return (
        <>
            <h2>
                This is a funny example Page
            </h2>
            <h3>
                Your Funny Text is {text}
            </h3>
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