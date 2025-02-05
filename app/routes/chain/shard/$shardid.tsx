import { Text, Group, Space, Loader, Paper, Grid } from '@mantine/core';
import BlockListCard from '~/components/blocklistcard/blocklistcard';
import { getBlocks } from '~/services/chains';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { BlockData } from '~/types/types';
import { useState, useEffect } from 'react';

import { useParams } from "@remix-run/react";
import SectionTitle from '~/components/sectiontitle/sectiontitle';

export const loader: LoaderFunction = async ({ params }) => {
  let blockList: BlockData[];
  var id: any = params.shardid;
  var chainID: number = parseInt(id);
  const { Result, Error } = (await getBlocks(chainID)) as any;
  console.log(Result);
  blockList = Result;
  return blockList
};

function ShardDetail() {
  const params = useParams();
  const chainID = params.shardid;

  const loaded = true;
  const loaderData = useLoaderData();
  const [data, setData] = useState(loaderData);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentProducer, setCurrentProducer] = useState(0);

  // if (loaderData.length > 0) {
  //   ;
  // }

  useEffect(() => {
    setData(loaderData)
    setCurrentHeight(loaderData[0].Height)
    setCurrentProducer(loaderData[0].BlockProducer)
  }, [loaderData]);

  const fetcher = useFetcher();

  // Get fresh data every 15 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load("/chain/beacon?index");
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
      setCurrentHeight(fetcher.data[0].Height)
      setCurrentProducer(fetcher.data[0].BlockProducer)
    }
  }, [fetcher.data]);

  return (
    <>
      <Group><SectionTitle text={"Shard " + chainID} /><Text>|</Text> <Text>Total blocks: {currentHeight}</Text></Group>
      <Space h="md" />
      <Paper radius={12} withBorder style={{ backgroundColor: '#303030', padding: 20 }}>
        <Grid columns={18}>
          <Grid.Col span={6}>Current block producer</Grid.Col>
          <Grid.Col span={12} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentProducer}</Grid.Col>
        </Grid>
      </Paper>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>
      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <BlockListCard blocklist={data} blockType='shardblk'></BlockListCard>
      </div>
      <Space h="sm" />
    </>

  );
}

export default ShardDetail;