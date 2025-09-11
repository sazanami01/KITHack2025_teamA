// layout.tsx
//"use client";

import SearchBar from "./SearchBar"
//import { Space, Tabs, MantineProvider } from "@mantine/core"
import { MantineProvider } from "@mantine/core"
import Link from "next/link"
//import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import { MdStarBorder } from "react-icons/md";
import { LiaGrinStarsSolid } from "react-icons/lia";
import styles from "./layout.module.css"
import './global.css';

interface PageProps {
    children: ReactNode 
}
const SaearchLayout = ({ children }: PageProps) => {
    // const segment = useSelectedLayoutSegment() as "art" | "user"
    return (
        <MantineProvider>
            <div style={{ 
                display: 'flex',          // 全体をフレックスコンテナに 
                flexDirection: 'column',  // 縦方向に配置
                alignItems: 'center',     // 横方向中央揃え
                paddingTop: '3rem'        // 上部に余白
            }}>
                <SearchBar />
               
            </div>
             {children} {/* 各ページの内容がここに入る*/}
        </MantineProvider>
    )
}
export default SaearchLayout;
                /*
                お気に入り登録 おそらく別の場所でやるのがベスト
                SearchBar
                    type={segment}
                />
                <Tabs value={segment}>
                    <Tabs.List>
                        <Link href="/search/art">
                            <Tabs.Tab value="art" leftSection={<MdStarBorder />} className={styles.tab} >
                                お気に入りの授業
                            </Tabs.Tab>
                        </Link>
                    </Tabs.List>
                </Tabs>*/