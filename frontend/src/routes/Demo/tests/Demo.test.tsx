import { render, findByTestId } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Demo from "../Demo";

it("renders demo", async () => {
    const { findByTestId } = render(
        <MemoryRouter>
          <Demo />
        </MemoryRouter>
      );
      const demoComponent = await findByTestId("demo-component");
      expect(demoComponent).toBeInTheDocument();
});