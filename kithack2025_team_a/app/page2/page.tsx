// syllabus/page.tsx
"use client";

import * as React from 'react';

import icon from "./mon.jpg";
import Image from "next/image";

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
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

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

    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 背景画像 */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}>
        <Image
          src={icon}
          alt="背景画像"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          sizes="100vw"
        />
      </div>


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

              <div style={{ 
                display: 'flex',          // 全体をフレックスコンテナに 
                flexDirection: 'column',  // 縦方向に配置
                alignItems: 'center',     // 横方向中央揃え
                paddingTop: '2rem'        // 上部に余白
            }}>
              </div>      

            </div>
            
          
          </Box>
          )}
        
      </Flex>

      </div>
    );
  };