/** @jsx jsx */
import { MdCheckCircle, MdClose } from "react-icons/md";
import { jsx } from "theme-ui";
import { Box, Button, Card, Flex, Heading, Text } from "../";
import { motion } from "framer-motion";

const Notification = ({ title, subTitle, variant, onClose }) => (
  <Card
    sx={{
      boxShadow: "medium",
      width: 320,
      position: "relative",
    }}
  >
    <Button
      onClick={onClose}
      variant="icon"
      sx={{ color: "muted", position: "absolute", top: 2, right: 2 }}
    >
      <MdClose />
    </Button>
    <Flex sx={{ alignItems: "center" }}>
      <MdCheckCircle sx={{ color: "green.50" }} />
      <Box sx={{ flex: "1 1 auto", ml: 3 }}>
        <Heading variant="h4">{title}</Heading>
        {subTitle && <Text sx={{ mb: 0 }}>{subTitle}</Text>}
      </Box>
    </Flex>
  </Card>
);

export { Notification };
