import { getPosts } from '../services'

// export async function getStaticProps() {
export async function GetStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}