import { Button } from "src/components/Button";

const config = {
  title: "Components/Button",
};

export default config;

export const Default = () => (
  <Button>
    <h3>test!</h3>
  </Button>
);

export const InitialCount = () => <Button initialCount={9} />;
