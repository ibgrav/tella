import { Button } from "./Button";

export default {
  title: "Components/Button",
};

export const Default = () => (
  <Button>
    <h3>test!</h3>
  </Button>
);

export const InitialCount = () => <Button initialCount={9} />;
