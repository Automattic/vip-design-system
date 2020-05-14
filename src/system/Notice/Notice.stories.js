import React from "react";
import { Box, Button, Flex, Heading, Link, Notice, Text } from "..";

export default {
  title: "Box",
  component: Notice
};

export const Default = () => (
  <Flex sx={{ alignItems: "center" }}>
    <Box sx={{ mx: 3, flex: "1 1 auto" }}>
      <Heading variant="h4">Your site is ready to launch!</Heading>
      <Text sx={{ mb: 0 }}>
        It looks like you're ready to share your application with the world.
        Read our{" "}
        <Link href="https://wpvip.com/documentation/self-launching-single-sites-on-vip/self-launching-on-vip/">
          guide on launching
        </Link>{" "}
        to learn more.
      </Text>
    </Box>
    <Box sx={{ flex: "0 0 auto" }}>
      <Button small>Launch →</Button>
    </Box>
  </Flex>
);
