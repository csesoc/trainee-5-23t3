import { Link } from 'react-router-dom'
import { Button, Modal, Autocomplete } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Wine from "../../images/wine.jpg"
// import Add from "../../images/add.png"

const SelfSessionPage: React.FC<{userData: any}> = (props) => {
  const [opened, { open, close }] = useDisclosure(false)

  // const drinks = ['Beer', 'Wine', 'Soju', 'Sake', 'Whisky', 'Vodka', 'O.J >:D', 'Tequila', 'Absinthe', 'Spirytus']

  // const content = Array(10)
  //   .fill(0)
  //   .map((_, index) => <p key={index}>{drinks}</p> )

  return (
    <>
    <img 
      src={Wine} 
      alt="wine"
      style={{
        width:"20%",
        height:"20%"
      }}/>

    <Modal opened={opened} onClose={close} title='Pick your Poison'>
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
          marginLeft: '35%'
        }}
        >
          Add
      </Button>
    </Modal>
    <Button onClick={open}>+</Button>

    <Link to="/reflection">
    <Button 
      size="xl"
      variant="gradient"
      gradient={{ from: "#E1341E", to: "#E75D4B", deg: 90}}
      style={{
          fontSize: "3vw",
          marginLeft: "40vw"
        }}>
      LEAVE
    </Button>
    </Link>
    </>
  );
}

export default SelfSessionPage