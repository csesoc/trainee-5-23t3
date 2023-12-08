// import React from 'react'
// import Autocomplete from "@mui/material/Autocomplete"
// import Textfield from "@mui/material/TextField"
import { Autocomplete, Button } from "@mantine/core"


export default function Modal() {
  return (
    <>
    <Autocomplete
      label="Drinks"
      placeholder="Pick your poison"
      data={['Beer', 'Wine', 'Soju', 'Sake', 'Whisky', 'Vodka', 'O.J >:D', 'Tequila', 'Absinthe', 'Spirytus']}
      style={{
        paddingBottom:'1.5vw'
      }}
      />

    <Button
      size="xl"
      variant="filled"
      color="red"
      style={{
        marginLeft:'40%',
        fontSize:'5vw',
        fontFamily: 'Marker Felt, fantasy'
    }}>
        ADD
    </Button>
    </>
  )
}

// const drinks = [
//   { label: 'Beer' },
//   { label: 'Wine' },
//   { label: 'Soju' },
//   { label: 'Sake' },
//   { label: 'Whisky' },
//   { label: 'Vodka' },
//   { label: 'O.J >:D' },
//   { label: 'Tequila' },
//   { label: 'Absinthe' },
//   { label: 'Spirytus' }
// ]
