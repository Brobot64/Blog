import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphCmsToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzE0NDMzOTYsImF1ZCI6WyJodHRwczovL2FwaS1jYS1jZW50cmFsLTEuaHlncmFwaC5jb20vdjIvY2xiZzcxNHNuMDFqcDAxdXMxNzd5NnE0aS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZjgzNWZiMTctYTkyYS00ZjZlLThjMDEtYzhiZTBiZGU4MTFhIiwianRpIjoiY2xidW04cWthMnN5ZzAxdWYyeGV6MXd3ZSJ9.rVfzIp9czKUOrpAdLCAZzYjpm_BynrlRc_q9c5LnbDgAvfppGUzofpF4oWEQU8fSmCRv3bzoE-AqWjnd6n2LUIi1zRaHUuAtFPAagKc1-2gIPZ90jnAbygTqBBsJZmQBA3y_u2nvER27KQwoI2A6OFAqfcxbWjK0TCiIG69ThzLNxeggkS3-DqkymiZddDfpiEU6A8B6MCdxyo73cBmxISlaGIglf_xh1gJRX55v7VNC6O9LRFEynggfr_gDWBk-eIV59HacyFGIzjScu77ZRbqErUwbwA4_tsRFDC9XrAFRDDcmg9oExTZDq7TpTusVw7qqdXKHXFCVSYa5ibhGW2cD5mO3rePVjKiTky9NKyX1d4K9CFqYukjbr_DxPL9kWDX7vi7FLNC9cqLhWwiJYh58mgDzYJp8grSpbpSfpsVEOdgx4n19NGbshgXsZ5IewN7EAIRoihSsb6a75sNParjNYgKAT-TrJGhj-0KXQNMG7IysLdz670kHWpR40LymviE5lFNxs50PIkgrWyA2K-J-H168JJCTXD-CsiUCOFG9UAJO3oDggHBtjC5mBmx0WyrIMu8CODsM-sAwflwAsltuMoc9UwRgCKUzL4AsOp2SDPyQovPlx4p5usMFfRltnerWinK2ROFAVI8JFh00BxWocwBopuPMFJln1IVZgzw';

export default async function handler (req, res) {
  console.log(graphCmsToken);
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphCmsToken}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
  
  try {
    const result = await graphQLClient.request(query, req.body);
    
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(413).send(error)
  }

}
