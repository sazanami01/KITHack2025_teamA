//SearchBar.tsx
"use client";

import React, { useState } from 'react';
import { Flex, TextInput, ActionIcon } from '@mantine/core';
import { IoMdSearch } from 'react-icons/io';
import styles from "./page.module.css"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// onSearchの型を定義
interface SearchBarProps {
    defaultValue?: string // 検索バーの初期値
}

// SearchBarコンポーネント
const SearchBar: React.FC<SearchBarProps> = ({ defaultValue = "" }) => { // defaultValueが渡されない場合は空文字を初期値とする
    const [searchInput, setSearchInput] = useState(defaultValue);
    //const isValidSearchInput = searchInput.trim().length !== 0
    const router = useRouter(); // Next.jsのルーターを取得

    // フォームの送信を処理する関数
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
        if (searchInput.trim().length > 0) { // 空白以外が入力されている場合
            router.push(`/gradeCalc?q=${encodeURIComponent(searchInput)}`); // クエリパラメータとして検索語を含むgradeCalcURLに遷移
        }
    };

    return (
        /* フォームの送信イベントをhandleSearchで処理 */
        /* Flexは横幅いっぱいに広げるために置いている(あと中央詰めにするため) */ 
        <form onSubmit={handleSearch}>             
            <Flex justify="center" align="center" mt="xl" mb="xl" gap="md" w="clamp(250px, 80%, 600px)">
                <TextInput
                    placeholder="授業名を入力してね!"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ flexGrow: 1 }}
                />
                
                    <ActionIcon type="submit" variant="filled" size="lg"> {/*ActionIconはボタンの役割 　*/}
                        <IoMdSearch />
                    </ActionIcon>
            </Flex >
        </form>
    );
};

export default SearchBar;