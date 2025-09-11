// layout.tsx
"use client";

import SearchBar from "./SearchBar";
//import { Space, Tabs, MantineProvider } from "@mantine/core"
import { MantineProvider } from "@mantine/core";
import Link from "next/link"
//import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import { MdStarBorder } from "react-icons/md";
import { LiaGrinStarsSolid } from "react-icons/lia";
import styles from "./layout.module.css"
import './global.css';

import { Layout } from "../styles/Layout";

interface PageProps {
    children: ReactNode 
}
const SaearchLayout = ({ children }: PageProps) => {
    // const segment = useSelectedLayoutSegment() as "art" | "user"
    return (
        <Layout>
        
        
        <MantineProvider>
            <div style={{ 
                display: 'flex',          // 全体をフレックスコンテナに 
                flexDirection: 'column',  // 縦方向に配置
                alignItems: 'center',     // 横方向中央揃え
                paddingTop: '2rem'        // 上部に余白
            }}>
            <SearchBar />
            
            </div>
            {children} {/* 各ページの内容がここに入る*/}
        </MantineProvider>
        </Layout>
    )
}
export default SaearchLayout;