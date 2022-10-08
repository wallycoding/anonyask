import { Grid, Spinner } from "@chakra-ui/react";

const LoadScreen = () => {
  return (
    <Grid placeItems="center" height="100vh">
      <Spinner size="lg" />
    </Grid>
  );
};

export default LoadScreen;