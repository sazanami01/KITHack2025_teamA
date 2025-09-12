// syllabus/page.tsx
"use client";

import * as React from 'react';
import { 
  Fragment,
  useEffect,
  useState
} from 'react'


//import Box from '@mui/material/Box';

import { Layout } from "../styles/Layout";



import { Suspense } from 'react';
import { SearchResultList } from './SearchResultList';
//import { Loader } from './Loader';
import { Box, Center, Loader, Text, Title, Flex } from '@mantine/core'
import { useSearchParams } from "next/navigation";

//import samplePhoto from "./sample1.png";


  // シラバスの表示についての設定

  interface PageProps {
    searchParams: {
        q?: string
    }
  }

export default function ArtSearchPage() {
 //　水和エラーが出るからuseSearchParamsを使う
const searchParams = useSearchParams(); // URLのクエリパラメータを取得するフック
  const query = searchParams.get('q') ?? ""; // qがnullのときは空文字にする
  

  return (
     /* ここから下が検索結果の表示部分 */
    <Flex direction="column" align="center" justify="center" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {query.length >= 1 ? (
          <Box my="md" style={{ width: '100%', maxWidth: '800px' }}>
          <Suspense key={query} fallback={ // queryが変わるたびにSuspenseをリセットする
            // Suspenseは、非同期処理の完了を待つためのコンポーネント
            // ローディング中に表示するコンポーネント
          <Center>
            <Loader />
          </Center>
        } >
          <SearchResultList query={query} /> 
        </Suspense>
      </Box>
        // queryが空のときに表示するコンポーネント
      )  : (
          <Box my="xl" style={{ textAlign: 'center' }}>
            <div>近大シラバスへようこそ!!!
              <br /> 
              上の検索バーで授業名で検索してみよう！(Enterを押してね...)
              <br />
            </div>
          </Box>
          )};
      </Flex>
    );
  };