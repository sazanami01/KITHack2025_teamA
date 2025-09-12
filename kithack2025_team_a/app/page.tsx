"use client"

import './globals.css'
import { Layout } from "./styles/Layout";

import styles from './topPage.module.css';

import Image from "next/image";
import icon from "./page2/mon.jpg";


export default function Home() {
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
      <div>

  <h1 className={styles.Welcome}>ようこそ！</h1>
  <p className={styles.bigsentence}><b>ここには、大学生活を送る上で必要最低限の機能が揃っています。</b></p>

  <div className={styles.block}>
  <h2 className={styles.bigsentence}>カレンダー</h2>
  <p className={styles.nomalsentence}>ページ１では、カレンダーに自分の予定を入れることができます。</p>
  <p className={styles.nomalsentence}>課題の締め切りやテストの日程など、大切な予定を記録しましょう。</p>
  </div>

  <div className={styles.block}>
  <h2 className={styles.bigsentence}>シラバス検索</h2>
  <p className={styles.nomalsentence}>ページ２では、自分が気になる授業のシラバスを確認できます。</p>
  <p className={styles.nomalsentence}>成績の割合と開講されている時間、必要最低限の情報があなたを待っています。</p>
  </div>

  <div className={styles.block}>
  <h2 className={styles.bigsentence}>時間割</h2>
  <p className={styles.nomalsentence}>ページ３では、時間割を作成できます。</p>
  <p className={styles.nomalsentence}>通常授業に加え、オンデマンド授業も追加することができます。あなただけの時間割を作りましょう。</p>
  </div>

  </div>
    </Layout>

    </div>
  )
}