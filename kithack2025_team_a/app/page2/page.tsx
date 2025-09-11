// syllabus/page.tsx
"use client";

import * as React from 'react';
import { 
  Fragment,
  useEffect,
  useState
} from 'react'


import Box from '@mui/material/Box';

import { Layout } from "../styles/Layout";



import { Suspense } from 'react';
import { SearchResultList } from './SearchResultList';
import { Loader } from './Loader';
import { Center } from '@mantine/core';
import { useSearchParams } from "next/navigation";



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
      <Box my="md">
        {query.length >= 1
          ? <Suspense key={query} fallback={ // queryが変わるたびにSuspenseをリセットする
            // Suspenseは、非同期処理の完了を待つためのコンポーネント
            // ローディング中に表示するコンポーネント
          <Center>
            <Loader />
          </Center>
        } >
        <SearchResultList query={query} /> 
          </Suspense>
          // queryが空のときに表示するコンポーネント
          : <div>近大シラバスへようこそ!!!
            <br /> 
            上の検索バーで授業名で検索してみよう！(Enterを押してね...)
            <br />
          </div>
        }
      </Box>
    );
  };
