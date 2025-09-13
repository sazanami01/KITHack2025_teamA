// syllabus/gradeCalc/page.tsx

"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Layout } from "../styles/Layout";

import SearchBar from "../page2/SearchBar";
import { Flex, TextInput, ActionIcon } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

import Image from "next/image";
import icon from "../page2/mon.jpg";


//　ArtPageコンポーネントが受け取るprops（引数）の型を定義するはず(意味なしだから削除)
// つまり、searchParamsの中にqという名前のパラメータが入っている可能性があると思うから置いた
/*interface ArtPageProps {
  searchParams?: { q?: string };
}*/

// 死ぬ気で授業データ入れたらその分授業が見れるようになるよ(白目)
//そうだよ（便乗）
const mockGrades = [
  // 外国語
  { subject: "英語総合2", gradeCalc: "授業中のディスカッションおよび確認テスト20%, TOEIC L&R(単位認定のためには必須)30%, 課題50%", time: "月曜&水曜: Aクラス4限・Bクラス3限" },
  { subject: "TOEIC2", gradeCalc: "授業中のディスカッション30%, TOEIC L&R(単位認定のためには必須)40%, 課題30%", time: "火曜: Aクラス3限・Bクラス4限・Cクラス2限" },
  { subject: "中国語総合2", gradeCalc: "確認テスト50%, 授業中のアクティビティ(口頭発表や課題)50%", time: "水曜: Aクラス5限・Bクラス4限" },
  { subject: "韓国語総合2", gradeCalc: "確認テスト50%, 授業中のアクティビティ(口頭発表や課題)50%", time: "水曜: Aクラス5限・Bクラス4限" },
  { subject: "ドイツ語総合2", gradeCalc: "確認テスト50%, 授業中のアクティビティ(口頭発表や課題)50%", time: "水曜: Aクラス5限・Bクラス4限" },
  { subject: "フランス語総合2", gradeCalc: "確認テスト50%, 授業中のアクティビティ(口頭発表・課題・小テスト)50%", time: "水曜: Aクラス5限・Bクラス4限" },
  { subject: "中国語総合4", gradeCalc: "確認テスト50%, 授業中のアクティビティ(口頭発表や課題)50%", time: "月曜: Aクラス1限・Bクラス2限" },
  { subject: "韓国語総合4", gradeCalc: "確認テスト50%, 授業中のアクティビティ(口頭発表や課題)50%", time: "月曜: Aクラス1限・Bクラス2限" },
  { subject: "ドイツ語総合4", gradeCalc: "定期試験50%, 小テスト20%, 口頭発表及び課題30%", time: "月曜: 2限" },
  { subject: "フランス語総合4", gradeCalc: "定期試験50%, 小テスト20%, 口頭発表及び課題30%", time: "月曜: 2限" },
  { subject: "ライティング2", gradeCalc: "授業中のディスカッション30%, 確認テスト40%, 課題30%", time: "月曜: Aクラス2限・水曜: Bクラス2限" },
  { subject: "アカデミックイングリッシュ２", gradeCalc: "授業中のディスカッション30%, 確認テスト20%, 課題(教科書課題+授業課題)50%", time: "月曜: Aクラス1限・水曜: Bクラス1限" },
  { subject: "IT英語2", gradeCalc: "Presentations40%, Research project30%, Homework30%", time: "月曜: 3限・4限" },
  { subject: "オーラルイングリッシュ2", gradeCalc: "In-Class Tasks and e-learning 40%, Tests20%, Homework40%", time: "木曜: Aクラス5限・Bクラス4限" },
  { subject: "オーラルイングリッシュ4", gradeCalc: "Tasks, Presentations and e-learning45%, Tests20%, Homework35%", time: "木曜: Aクラス1限・Bクラス2限" },

  // 基礎科目
  { subject: "基礎線形代数学2", gradeCalc: "レポート40%, 小テスト30%, 期末30%", time: "月曜: Aクラス2限・水曜: Bクラス4限" },
  { subject: "生物学", gradeCalc: "小テスト30%, 定期試験70%", time: "月曜: 5限" },
  { subject: "化学", gradeCalc: "2回の単元テスト100%", time: "火曜: 5限" },

  // 専門科目
  { subject: "プログラミング基礎2", gradeCalc: "確認テスト(予習または復習)10%, 確認テスト(中間確認演習)20%, 確認テスト(総合確認演習)20%, 各回の実習課題50%", time: "火曜: 3~4限" },
  { subject: "オブジェクト指向プログラミング", gradeCalc: "確認テスト50%, 確認テスト(第7回)25%, 確認テスト(第13回)25%", time: "月曜: Aクラス3限・Bクラス2限" },
  { subject: "情報処理実習2", gradeCalc: "演習課題1 20%, 演習課題2 20%, 演習課題3 20%, 最終課題 40%", time: "木曜: 2限" },
  { subject: "IoT", gradeCalc: "まとめとなる確認テスト(第15回)20%, 確認テスト(上記以外)80%", time: "金曜: Aクラス1限・Bクラス2限" },
  { subject: "確率統計", gradeCalc: "確認テスト60%, レポート40%", time: "金曜: Aクラス2限・Bクラス1限" },
  { subject: "機械学習概論", gradeCalc: "講義中に課す課題。100%", time: "金曜: 3限" },
  { subject: "情報システム応用", gradeCalc: "中間課題30%, 確認テスト50%, 小テスト・レビューテスト20%", time: "金曜: Aクラス4限・Bクラス5限" },
  { subject: "統計データ解析", gradeCalc: "確認テスト(総合演習)40%, 各回の確認テスト（復習）、課題、宿題60%", time: "月曜: 3限(知能)" },
  { subject: "ブロックチェーン", gradeCalc: "1回から15回までの小テスト100%", time: "月曜: 3限(サイバー)" },
  { subject: "モデル最適化基礎", gradeCalc: "確認テスト・各回の課題60%, 中間レポート20%, 最終課題20%", time: "月曜: 3限(実世界)" },
  { subject: "コンピュータグラフィックス", gradeCalc: "達成度判定1(演習課題含む(第8回))50%, 達成度判定2(演習課題含む(第14回))50%", time: "月曜: 4限(実世界)" },
  { subject: "Webシステム", gradeCalc: "確認テスト50%, 課題成果物50%", time: "火曜: Aクラス5限・Bクラス3限" },
  { subject: "医療情報学応用", gradeCalc: "	レポート100%", time: "火曜: 3限(知能)" },
  { subject: "ネットワーク演習2", gradeCalc: "確認テスト(筆記)50%,確認テスト(実技)50%", time: "火曜: 4~5限(サイバー)" },
  { subject: "オブジェクト指向設計", gradeCalc: "確認テスト(第15回)60%, 日常の確認テストと演習40%", time: "火曜: Aクラス4限・Bクラス5限" },
  { subject: "データマイニング", gradeCalc: "講義中に実施する確認テスト・各回の課題50%, レポート(出題したレポートをすべて提出しなければ本講義の単位は認定しない)50%", time: "火曜: 4限(知能・実世界)" },
  { subject: "セキュリティ技術評価と実装技術", gradeCalc: "確認テスト100%", time: "水曜: 5限(サイバー)" },
  { subject: "機械学習2", gradeCalc: "中間確認課題(提出は必須)30%, 最終確認課題(提出は必須)40%, 毎回のレポート課題(提出は必須)30%", time: "水曜: 2限(知能)" },
  { subject: "組み込みシステム", gradeCalc: "確認テスト80%, 期末レポート20%", time: "木曜: 2限(サイバー)" },
  { subject: "インタラクティブシステム", gradeCalc: "確認課題 60%, レポート40%", time: "木曜: 2限(実世界)" },
  { subject: "機械学習1", gradeCalc: "レポート(出題したレポートをすべて提出しなければ本講義の単位は認定しない)50%, 確認テスト 50%", time: "木曜: 4限(知能)" },
  { subject: "情報セキュリティ対策と管理1", gradeCalc: "確認テスト100%", time: "木曜: 4限(サイバー)" },
  { subject: "調査データ分析", gradeCalc: "確認テスト(総合演習)40%, 各回の確認テスト(復習)、課題、宿題60%", time: "木曜: 4限(実世界)" },
  { subject: "実践機械学習", gradeCalc: "確認テスト・各回の課題50%, レポート(出題したレポートをすべて提出しなければ本講義の単位は認定しない)50%", time: "金曜: 2限(知能)" },
  { subject: "ネットワークセキュリティ技術", gradeCalc: "複数回の小テスト80%, 演習課題20%", time: "金曜: 2限(サイバー)" },
  { subject: "HUI", gradeCalc: "確認テスト70%, レポート30%", time: "金曜: 2限(知能)" },
  { subject: "プログラミング実習2", gradeCalc: "実習課題70%, 総合課題30%", time: "金曜: 3~4限" },
  { subject: "人間中心設計論", gradeCalc: "レポート100%", time: "金曜: 5限(実世界)" },
  { subject: "情報学基礎ゼミナール2", gradeCalc: "毎回の課題40%, 他者と協調した情報収集30%, 調査発表30%", time: "火曜: 2限&金曜: 4限" },
  { subject: "情報学応用ゼミナール2", gradeCalc: "調査活動の中間報告50%, 	報告書50%", time: "水曜: 2限&木曜: 4限" },
  { subject: "知能システムプロジェクト2", gradeCalc: "各回の課題80%, 中間レポート20%", time: "水曜: 3~4限(知能)" },
  { subject: "サイバーセキュリティプロジェクト2", gradeCalc: "授業冒頭の確認テスト、レポート課題80%, 確認テスト(最終)20%", time: "水曜: 3~4限(サイバー)" },
  { subject: "実世界コンピューティングプロジェクト２", gradeCalc: "各回の課題・レポート60%, 最終課題・レポート40%", time: "水曜: 3~4限(実世界)" },
  { subject: "社会情報学実習2", gradeCalc: "毎週の進捗状況報告(週報)20%, 中間報告30%, 最終報告50%", time: "月曜: 5限(実世界)・金曜: 5限(知能・サイバー)" },

  // 共通教養
  { subject: "情報学入門ゼミナール", gradeCalc: "各回の課題60%, 調査報告書20%, プレゼンテーション20%", time: "火曜: 2限" },
  { subject: "教養特殊講義C", gradeCalc: "最終課題(テーマに対する提案&自己省察;提案制作に至るプロセスを含む)60%, 対面開講の際に提出してもらうリフレクションシート40%", time: "木曜: 1限" },
  { subject: "教養特殊講義B", gradeCalc: "ミニッツペーパー・課題70%, 授業内最終レポート30%", time: "木曜: 4限" },
  { subject: "企業倫理と知的財産", gradeCalc: "毎回行われる授業最後の質問への解答50%, 試験50%", time: "木曜: 5限" },
  { subject: "プレゼンテーション技術", gradeCalc: "授業内での演習・ワークシートへの取り組み30%, 試行及び実践プレゼンテーション50%, 期末レポート(プレゼンテーションに関するレポート)20%", time: "木曜: 6限" },
  { subject: "生涯スポーツ2", gradeCalc: "スポーツや健康・体力に関する科学的理解度25%, 仲間との協同的・支援的な関わり度25%, 運動技能の習得度25%, 自律的実践度25%", time: "月曜: 1限・火曜: 2限・木曜: 4限・5限" },

  // オンデマンド
  { subject: "教養特殊講義Ａ", gradeCalc: "ミニレポート20%, 最終レポート80%", time: "オンデマンド" },
  { subject: "科学技術の進歩と人権", gradeCalc: "レポートの提出(計３回)100%", time: "オンデマンド" },
  { subject: "環境と社会", gradeCalc: "小レポート課題及び小テスト(複数回合計=40点)40%, 大レポート課題1(20点)20%, 大レポート課題2(20点)20%, 大レポート課題3(20点)20%", time: "オンデマンド" },
  { subject: "暮らしのなかの憲法", gradeCalc: "レポート課題(全3回)60%, 学期末試験(レポート課題)40%", time: "オンデマンド" },
  { subject: "ビジネスモデルとマネジメント", gradeCalc: "中間課題45%, 学生間ディスカッション15%, 最終課題40%", time: "オンデマンド" },
  { subject: "技術と倫理", gradeCalc: "レポート100%", time: "オンデマンド" },
  { subject: "データリテラシー入門", gradeCalc: "KBマップ課題(第1回、第3回～第8回)30%, KBマップ課題+テスト(第9回)20%, 練習課題+演習課題(第10回-第15回)40%, グループディスカッション(第2回授業時間外、第10回授業時間外)10%", time: "オンデマンド" },
  { subject: "住みよい社会と福祉", gradeCalc: "中間レポート50%, 期末レポート50%", time: "オンデマンド" },

  // 専門科目オンデマンド
  { subject: "自然言語処理", gradeCalc: "レポート課題(第2回〜第13回)60%, プログラム作成課題(第14回)40%", time: "オンデマンド" },
  { subject: "数理計画法", gradeCalc: "確認テスト60%, レポート40%", time: "オンデマンド" },
  { subject: "情報数学", gradeCalc: "確認テスト1(第9回)50%, 確認テスト2(第15回)30%, 演習(第1〜8回,第10〜14回)20%", time: "オンデマンド" },
  { subject: "情報セキュリティ", gradeCalc: "各回の確認テスト100%", time: "オンデマンド" },
  { subject: "知的エージェント", gradeCalc: "最終レポート40%, 中間レポート60%", time: "オンデマンド" },
  { subject: "クラウドコンピューティング", gradeCalc: "レポート課題(第2回~第9回)60%, クラウドサービス演習課題(第10回〜第14回)30%, Webアプリケーション開発課題(第15回)10%", time: "オンデマンド" },
  { subject: "情報と社会", gradeCalc: "確認テスト90%, レポート10%", time: "オンデマンド" },
  { subject: "複合システムデザイン", gradeCalc: "プログラムを含めた週次レポート60%, 課題40%", time: "オンデマンド" },
  { subject: "サービスコンピューティング", gradeCalc: "プログラムを含めた週次レポート60%, 課題40%", time: "オンデマンド" },
  { subject: "深層強化学習", gradeCalc: "確認テスト50%, 確認テスト(第8回)25%, 確認テスト(第15回)25%", time: "オンデマンド" },
  { subject: "社会シミュレーション", gradeCalc: "中間レポート60%, 最終レポート40%", time: "オンデマンド" },

];

export default function ArtPage() {
  const searchParams = useSearchParams(); //URLのクエリパラメータを取得するためのフック
  const [grades, setGrades] = useState([...mockGrades]); //授業データを状態として管理
  const query = searchParams.get("q") ?? ""; //検索クエリを取得、存在しない場合は空文字列
  // 検索クエリでフィルタリング
  const results = query
    ? grades.filter((item) => item.subject.includes(query)) //少しでもquery( Ex)英語など単語が当てはまっている場合 )が含まれていれば表示
    : grades; //queryが空の場合は全ての授業を表示

  return (

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


    <Layout>
      
    <div style={{ padding: "2rem" }}>
        <h3>近大シラバス</h3>
        <SearchBar />

      <h2>後期授業(シラバス簡易版(再履修入力してません))</h2>
      {/* シラバスの表を作成 */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        {/*シラバステーブルの並び順*/}
        <thead>
          <tr> 
            <th style={{ border: "1px solid #100202ff", padding: "8px" }}>科目</th>
            <th style={{ border: "1px solid #090000ff", padding: "8px" }}>成績基準</th>
            <th style={{ border: "1px solid #110101ff", padding: "8px" }}>授業時間(コース毎)</th>
          </tr>
        </thead>
        <tbody>
          {/*map関数で配列の要素を一つずつ取り出して表示*/}
          {results.map((item, idx) => (
            <tr key={idx}> 
              <td style={{ border: "1px solid #5017b3ff", padding: "8px" }}>{item.subject}</td>
              <td style={{ border: "1px solid #b01381ff", padding: "8px" }}>{item.gradeCalc}</td>
              <td style={{ border: "1px solid #ffdd19ff", padding: "8px" }}>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
       {/*何も授業が当てはまっていない時に表示できなくする*/}
      {results.length === 0 && <div>該当する科目がありません。</div>}
    </div>
    </Layout>

    </div>
  );
}