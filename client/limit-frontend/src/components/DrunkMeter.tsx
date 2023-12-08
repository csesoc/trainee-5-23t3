import { Progress } from "@mantine/core";
import classes from './DrunkMeter.module.css'



const DrunkMeter: React.FC<{progress: number}> = (props) => { 
    return <Progress className={classes.progress} color="#690C06" value={props.progress} />;
}

export default DrunkMeter
