import { Button } from "@mantine/core";

const SelfSessionPage: React.FC<{userData: any, emitData: Function}> = (props) => {
  return (
    <>
        <h3>
            Self Session Page
        </h3>
        <Button onClick={() => props.emitData("Hello Data2")}>Hello World</Button>
    </>
  );
}

export default SelfSessionPage