/** @jsx jsx */
import { jsx } from "theme-ui";

import { Avatar, Box, Card, Flex, Heading, Link, Text } from "..";
// import WordPressIcon from "../../components/icons/WordPressIcon";

const Application = ({ app, variant = "grid", sx, ...props }) => (
  <Card
    {...props}
    sx={{
      p: 0,
      cursor: "pointer",
      transition: "box-shadow .2s ease-in-out",
      "&:hover": { boxShadow: "medium" },
      ...sx
    }}
  >
    <img src={app.screenshot} sx={{ width: "100%" }} />
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Heading
          variant="h4"
          sx={{ mb: 0, display: "flex", alignItems: "center" }}
        >
          {/* <WordPressIcon
						sx={{ mr: 2, fontSize: "20px !important" }}
					/> */}
          {app.title}
        </Heading>
        <Link href="#!">{app.url}</Link>
      </Box>
      <Flex sx={{ alignItems: "center", mb: 1 }}>
        <Avatar size={16} sx={{ mr: 2 }} />
        <Text sx={{ fontSize: 1, mb: 0 }}>
          <strong>production</strong> deployed <Link href="#!">8ede999</Link>{" "}
          <span sx={{ color: "muted" }}>2 days ago</span>
        </Text>
      </Flex>
      <Flex sx={{ alignItems: "center" }}>
        <Avatar size={16} sx={{ mr: 2 }} />
        <Text sx={{ fontSize: 1, mb: 0 }}>
          <strong>development</strong> deployed <Link href="#!">4bde002</Link>{" "}
          <span sx={{ color: "muted" }}>2 days ago</span>
        </Text>
      </Flex>
    </Box>
  </Card>
);

export { Application };
