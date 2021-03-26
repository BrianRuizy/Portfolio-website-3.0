import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import { FiGithub } from "react-icons/fi"
import { BiLinkExternal } from "react-icons/bi"

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fileAbsolutePath: {regex: "/featured/"}, frontmatter: {hide: {ne: true}}}) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              path
              github
              demo
              name
              category
              thumbnail
              description
            }
          }
        }
      }
    }
  `)
  return (
    <Container>
      <Row>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Col key={node.id} sm={12}>
            <Card className="mb-4 featured">
            <Row>
              <Col md={6} sm={12}>
                <Card.Body>
                  <Card.Header>{node.frontmatter.category}</Card.Header>
                  <Card.Title>{node.frontmatter.name}</Card.Title>
                  <Card.Text>{node.frontmatter.description}</Card.Text>
                  <hr/>
                  <Card.Link href={node.frontmatter.path} className="mr-1">
                    <Button variant="outline-primary">Learn more</Button>
                  </Card.Link>
                  {node.frontmatter.github && (
                    <Card.Link href={node.frontmatter.github}>
                      <FiGithub />
                    </Card.Link>
                  )}
                  {node.frontmatter.demo && (
                    <Card.Link href={node.frontmatter.demo}>
                      <BiLinkExternal />
                    </Card.Link>
                  )}
                </Card.Body>
              </Col>
              <Col md={6} sm={12} className="text-center">
                <Link to={node.frontmatter.path}>
                  {!!node.frontmatter.thumbnail && (
                    <Card.Img src={node.frontmatter.thumbnail} alt={node.frontmatter.name + " - Featured Shot"} />
                  )}
                </Link>
              </Col>
            </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Featured

