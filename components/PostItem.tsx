import React from 'react';
import styled from 'styled-components';

// const maxWidth = 600;
const IMAGE_URL = 'https://upply-interview.herokuapp.com/images/';

const ImageContainer = styled.img``;
const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  justify-content: center;
  border: 1px solid #555;
  margin-top: 10px;
`;
const Title = styled.span`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Content = styled.span`
  font-size: 15px;
`;
const Footer = styled.span`
  font-size: 12px;
  text-align: right;
`;
export interface Post {
  id: number;
  title: string;
  text: string;
  date?: string;
  src: string;
}

export default ({ title, date, text, src }: Post) => {
  return (
    <Container>
      <ImageContainer src={`${IMAGE_URL}${src}`} />
      <Title>{title}</Title>
      <Content>{text}</Content>
      <Footer>{date}</Footer>
    </Container>
  );
};
