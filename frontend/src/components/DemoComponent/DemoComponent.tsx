import { DemoStyle, DemoButton } from "./DemoComponent.styles";
import axios from "axios";
import { useState } from "react";

const DemoComponent = () => {
    const [message, setMessage] = useState("This is just a demo component!");

    const getData = async () => {
        setMessage(await (await axios.get(process.env.REACT_APP_API_URL)).data);
    }
    
    return (
        <DemoStyle data-testid="demo-component">
            <DemoButton data-testid="demo-button" onClick={getData}>Styled Button!</DemoButton>
            {message}
        </DemoStyle>
    )
}

export default DemoComponent;
