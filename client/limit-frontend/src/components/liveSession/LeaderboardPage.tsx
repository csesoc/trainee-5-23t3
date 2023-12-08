import DrunkMeter from "../drunkMeter";

const LeaderboardPage: React.FC<{userDataList: any}> = (props) => {

  const userList = props.userDataList.map(user => {
    return (
    <div>
      {user}
      <DrunkMeter progress={10}/>
    </div>
    )
  })

  return (
    <>
        <h3>
            Leaderboard Page
        </h3>
        <div>
          {userList}
        </div>
    </>
  );
}

export default LeaderboardPage