import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DemoComponent from "../DemoComponent";

it("renders demo component text", async () => {
    const { findByText } = render(
        <MemoryRouter>
          <DemoComponent />
        </MemoryRouter>
      );
      const demoText = await findByText("demo", {exact: false});
      expect(demoText).toBeInTheDocument();
});

it("renders demo component button", async () => {
    const { findByText } = render(
        <MemoryRouter>
          <DemoComponent />
        </MemoryRouter>
      );
      const button = await findByText("Styled", {exact: false});
      expect(button).toBeInTheDocument();
});