"use client"

import '../globals.css'
import { Layout } from "../styles/Layout";

import image1 from "./HK.png";
import image2 from "./HN.png";
import image3 from "./KK.png";
import image4 from "./KU.png";

import Image from "next/image";

import icon from "../page2/mon.jpg";

export default function page3() {
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
      <div className='center'>
      <h1 className="font-bold text-2xl text-gray-700">平日の時刻表</h1>
        <div style={{ display: "flex"}}>
          <Image src={image1} alt="icon" width={500} height={500}/>
          <Image src={image2} alt="icon" width={500} height={500}/>
        </div>
      </div>
    <h1 className="font-bold text-2xl text-gray-700">休日の時刻表</h1>

    <div style={{ display: "flex", }}>
        <Image src={image3} alt="icon" width={500} height={500}/>
        <Image src={image4} alt="icon" width={500} height={500}/>
    </div>
    </Layout>

    </div>
  )
}