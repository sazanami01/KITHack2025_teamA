// SearchResultList.tsx
//検索結果のリストを表示するためのコンポーネントのつもり(これのおかげでエラーが出ていない)
"use client";
import React from "react"; 

interface SearchResultListProps {
  query: string;
}

export const SearchResultList: React.FC<SearchResultListProps> = ({ query }) => {
  // 仮の表示
  return (
    <div>
      検索結果: {query}
    </div>
  );
};
