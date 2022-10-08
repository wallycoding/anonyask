import signInGoogle from "@/data/signInGoogle";
import { Button, Flex, Grid, Heading } from "@chakra-ui/react";
import { useState } from "react";

const SignIn = () => {
  // Simple SignIn With Google ;)
  const [loading, setLoading] = useState(false);
  return (
    <Grid placeItems="center" minH="100vh">
      <Flex flexDirection="column">
        <Heading fontSize={15} mb="10px">
          Auth with Google
        </Heading>
        <Button
          isLoading={loading}
          loadingText="Authenticating..."
          onClick={async () => {
            setLoading(true);
            await signInGoogle();
            setLoading(false);
          }}
          minWidth={250}
          colorScheme="blue"
        >
          Google
        </Button>
      </Flex>
    </Grid>
  );
};

export default SignIn;
