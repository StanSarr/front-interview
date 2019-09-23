import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostItem from '../components/PostItem';

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  margin-bottom: 10px;
`;

const Blog: React.FunctionComponent = () => {
  const [posts, setPosts] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [filter, setFilter] = React.useState('DESC');
  const [search, setSearch] = React.useState('');
  React.useEffect(() => {
    fetch('https://upply-interview.herokuapp.com/').then(async response => {
      const data = await response.json();
      const fixedPost = data.map(({ id, src, text, title, date }) => ({
        date: date ? date : new Date(id).toISOString(),
        id,
        src,
        text,
        title
      }));
      setPosts(fixedPost);
      setFilteredPosts(fixedPost);
    });
  }, []);

  React.useEffect(() => {
    if (search.length > 0) {
      const filteredPost = posts.filter(
        ({ title }) => title.search(search) >= 0
      );
      setFilteredPosts(filteredPost);
    } else {
      setFilteredPosts(posts);
    }
  }, [search]);

  React.useEffect(() => {
    const filteredPost = posts.sort((dataA, dataB) => {
      if (filter === 'ASC') {
        return new Date(dataA.date).getTime() - new Date(dataB.date).getTime();
      } else {
        return new Date(dataB.date).getTime() - new Date(dataA.date).getTime();
      }
    });
    setFilteredPosts(filteredPost);
  }, [filter]);

  return (
    <Layout>
      <Input
        placeholder="Search"
        onChange={event => setSearch(event.target.value)}
      />
      <Select onChange={event => setFilter(event.target.value)}>
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </Select>
      {filteredPosts.map(post => (
        <PostItem key={post.id} {...post} />
      ))}
    </Layout>
  );
};
/*
{posts.map(post => (
        <PostItem key={post.id} {...post} />
      ))}
*/

export default Blog;
