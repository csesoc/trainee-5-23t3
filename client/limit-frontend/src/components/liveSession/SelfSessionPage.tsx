import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Autocomplete } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Wine from "../../images/wine.jpg"
import Add from "../../images/add.png"
import StarOutline from "../../images/staroutline.png"
import Star from "../../images/star.png"
import Remove from "../../images/remove.png"

interface Item {
  id: number;
  name: string;
  selected: boolean;
}

interface FavouriteItem extends Item {
  isFavorite: boolean;
}

const SelfSessionPage: React.FC<{userData: any, emitData: Function}> = (props) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Beer (3 stds)', selected: true },
    { id: 2, name: 'Wine (3 stds)', selected: true },
    { id: 3, name: 'Soju (3 stds)', selected: true },
    { id: 4, name: 'Sake (3 stds)', selected: true },
    { id: 5, name: 'Whisky (2 stds)', selected: true },
    { id: 6, name: 'Vodka (2 stds)', selected: true },
    { id: 7, name: 'O.J >:D (2 stds)', selected: true },
    { id: 8, name: 'Tequila (1 std)', selected: true },
    { id: 9, name: 'Absinthe (1 std)', selected: true },
    { id: 10, name: 'Spirytus (1 std)', selected: true }
  ]);

  const [favourites, setFavourites] = useState<FavouriteItem[]>([])

  const [searchTerm, setSearchTerm] = useState<string>('')

  const [firstModalOpen, setFirstModalOpen] = useState(false)

  const [secondModalOpen, setSecondModalOpen] = useState(false)

  const openFirstModal = () => setFirstModalOpen(true)
  const closeFirstModal = () => setFirstModalOpen(false)

  const openSecondModal = () => {
    closeFirstModal() // closes the first modal before opening the second
    setSecondModalOpen(true)
  }

  const closeSecondModal = () => setSecondModalOpen(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToFavourite = (item: Item) => {
    const favoriteItem: FavouriteItem = { ...item, isFavorite: true };
    setFavourites([...favourites, favoriteItem]);
    handleItemClick(item.id);
  };

  const handleRemoveFromFavourite = (itemId: number) => {
    setFavourites(favourites.filter((item) => item.id !== itemId))
    handleItemClick(itemId);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // const [isStarFill, setIsStarFill] = useState(true);

  const handleItemClick = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };


  return (
    <>
    <img 
      src={Wine} 
      alt="wine"
      style={{
        width:"33%",
        height:"33%"
      }}/>

    <button 
      style={{
        width: "50px",
        height: "50px",
        background: "none",
        padding: 0,
        border: "none"
      }}><img src={Add} onClick={openFirstModal} 
        style={{
          position: "absolute",
          width: "7.5%",
          height: "15%",
          marginLeft: "-13.5vw",
          marginTop:"-6.5vw"
      }} />
    </button>

    <Modal opened={firstModalOpen} onClose={closeFirstModal} title='Pick and Add your Poison :))'>
    <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Drinks"
        style={{
          marginInline: "25%"
        }}
      />
      
        {filteredItems.map((item) => (
          <p key={item.id}>
            <Button onClick={() => props.emitData(`${item.name} has been added`)} 
            style={{
              marginLeft:"15%",
              fontSize: "1.5vw",
              backgroundColor: "yellowgreen",
              fontFamily: "Trebuchet MS, sans-serif",
              alignContent: "flex-start",
            }}>{item.name}</Button>
            <Button onClick={() => handleAddToFavourite(item)} style={{
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "1.5vw",
              right: "2vw",
              position: "fixed"
            }}><img src={item.selected ? StarOutline: Star} alt='⭐' style={{
              alignContent: 'flex-end',
              height: '2vw',
              width: '2vw',
              background: "none",
              border: "none",
              padding: 0,
            }}/></Button>
          </p>
        ))}
        
      <Button
        size="xl"
        variant="filled"
        color="red"
        style={{
          marginLeft: "35%"
        }}
        >
          Add
      </Button>
    </Modal>

     {/* For the favourites */}
     <Modal opened={secondModalOpen} onClose={closeSecondModal} title='Favourites'>
      {favourites.map((item) => (
        <p key={item.id}>
          <Button onClick={() => props.emitData(`${item.name} has been added`)} 
          style={{
            marginLeft:"20%",
            fontSize: "1.5vw",
            backgroundColor: "yellow",
            color: "black",
            fontFamily: "Trebuchet MS, sans-serif"
          }}>{item.name}</Button>
          <Button onClick={() => handleRemoveFromFavourite(item.id)} style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "1.5vw",
            right: "2vw",
            position: "fixed"
          }}>
          <img src={item.selected ? Remove: Star} alt='❌' style={{
            marginLeft: '0.5vw',
            height: '2vw',
            width: '2vw',
            background: "none",
            border: "none",
            padding: 0,
          }}/>
        </Button>
      </p>
      ))}
      <Button
        size="xl"
        variant="filled"
        color="red"
        style={{
          marginLeft: "35%"
        }}
        >
          Add
      </Button>
    </Modal>
    <button 
      style={{
       width: "50px",
       height: "50px",
       background: "none",
       padding: 0,
       border: "none"
      }}><img src={Star} onClick={openSecondModal} 
        style={{
          position: "absolute",
          width: "5%",
          height: "10%",
          top: "5vw",
          right: "1vw"
      }} />
    </button>
    
    <Link to="/reflection">
    <Button 
      size="xl"
      variant="gradient"
      gradient={{ from: "#E1341E", to: "#E75D4B", deg: 90}}
      style={{
          fontSize: "3vw",
          position: "absolute",
          bottom: '1vw',
          right: '1vw'
        }}>
      LEAVE
    </Button>
    </Link>
    </>
  );
}

export default SelfSessionPage