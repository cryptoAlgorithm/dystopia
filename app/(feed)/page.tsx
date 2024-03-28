import mongodb from "@/lib/mongodb";
import {IPost} from "@/data/IPost";
import {WithId} from "mongodb";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography
} from "@mui/joy";
import NextLink from 'next/link'
import PostCard from "@/components/PostCard";

const getPosts = async (): Promise<WithId<IPost>[]> => {
  const db = (await mongodb).db()
  return db.collection<IPost>("posts").find().toArray()
}

export default async function Home() {
  const posts = await getPosts()
  return <Stack direction={'row'}>
    <List size={'lg'} sx={{
      maxWidth: 240,
      flexShrink: 0,
      '& [role=button]': {
        borderTopRightRadius: 'var(--List-radius)',
        borderBottomRightRadius: 'var(--List-radius)'
      },
      '--List-radius': '8px',
    }}>
      <ListItem>
        <ListItemButton selected>Home</ListItemButton>
      </ListItem>
      <Box flex={1} />
      <ListItem>
        <ListItemButton>User</ListItemButton>
      </ListItem>
    </List>
    <Divider orientation={'vertical'} sx={{ ml: 2 }} />
    <Box flex={1}>
      <Container maxWidth={'sm'}>
        <Stack my={2} spacing={2}>
          { posts.map(post => <PostCard post={post} key={post._id.toString()} />) }
        </Stack>
      </Container>
    </Box>
  </Stack>
}
