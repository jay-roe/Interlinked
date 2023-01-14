import { DemoStyle, DemoButton } from "./DemoComponent.styles";

const DemoComponent = () => {
    return (
        <DemoStyle data-testid="demo-component">
            <DemoButton>Styled Button!</DemoButton>
            This is just a demo component!
        </DemoStyle>
    )
}

export default DemoComponent;
