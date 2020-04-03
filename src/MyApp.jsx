import React, { useState } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import items from './items.json';
import './App.css';

const dummyData = {
  'fire pit': 3,
  campfire: 5,
  'alchemy engine': 1,
  'thermal stone': 5,
  'rain coat': 1,
  spear: 1,
  'log suit': 1,
};

const completions = Object.keys(items);

function removeItem(data, setData) {
  return (item) => {
    if (data[item] !== undefined) {
      if (data[item] > 1) {
        setData({
          ...data,
          [item]: data[item] - 1,
        });
      } else {
        const { [item]: _, ...rest } = data;
        setData({ ...rest });
      }
    }
  };
}

export default function MyApp() {
  const [data, setData] = useState([]);

  const handleInsert = (item) => {
    setData({
      ...data,
      [item]: 1 + (data[item] !== undefined ? data[item] : 0),
    });
  };

  return (
    <Layout>
      <SearchBar completions={completions} handleInsert={handleInsert} data={data} />
      <ItemList data={data} handleRemove={removeItem(data, setData)} />
    </Layout>
  );
}
