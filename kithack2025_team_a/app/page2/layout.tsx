// layout.tsx
"use client";

import SearchBar from "./SearchBar";
//import { Space, Tabs, MantineProvider } from "@mantine/core"
import { MantineProvider, Title } from "@mantine/core";
import Link from "next/link"
//import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import { MdStarBorder } from "react-icons/md";
import { LiaGrinStarsSolid } from "react-icons/lia";
import styles from "./layout.module.css"
import './global.css';

import { Layout } from "../styles/Layout";
import icon from "./sample3.png";
import Image from "next/image";

interface PageProps {
    children: ReactNode 
}
const SaearchLayout = ({ children }: PageProps) => {
    // const segment = useSelectedLayoutSegment() as "art" | "user"
    return (
        <Layout>
        {/*<div style={{backgroundColor: 'White', minHeight: '100vh' }}>*/}
        
        <MantineProvider>
            <div style={{ 
                display: 'flex',          // 全体をフレックスコンテナに 
                flexDirection: 'column',  // 縦方向に配置
                alignItems: 'center',     // 横方向中央揃え
                paddingTop: '2rem'        // 上部に余白
            }}>

            {/* 一番上に表示するタイトル */}
                <Title order={1} size="h1" mb="sm" className={styles.pageTitle}>
                    近大シラバス
                </Title>
            <SearchBar />
            </div>
            {children} {/* 各ページの内容がここに入る*/}
                {/*<Image src={icon} alt ="aaa" layout="fill" objectFit="cover" className="absolute top-0 left-0 z-[0]"/>*/}
        </MantineProvider>
        
        {/*</div>*/}
        </Layout>
    )
}
export default SaearchLayout;