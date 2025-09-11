import { FC, memo, ReactNode, useState } from "react";
import React from "react";
import Link from "next/link";
import styles from "./Layout.module.scss";
import { HomeIcon } from "./HomeIcon";
import { usePathname } from "next/navigation";
import { JSX } from "@fullcalendar/core/preact.js";


type Props = {
  children: ReactNode;
}

type Navigation = {
  pageName: string;
  path: string;
  /*icon: JSX.Element;*/
  icon: React.ReactNode; // 修正
}

const navigations: Navigation[] = [
  {
    pageName: "トップ",
    path: "/",
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ページ2",
    path: "/page2",
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ページ3",
    path: "/page3",
    icon: <HomeIcon className={styles.icon}/>
  },
  {
    pageName: "ページ4",
    path: "/page4",
    icon: <HomeIcon className={styles.icon}/>
  },

]

/* eslint-disable-next-line react/display-name */
export const Layout: FC<Props> = memo((props) => {

  const { children } = props;

  const [ menuOpen, setMenuOpen ] = useState(true);

  const pathname = usePathname();

  const isPageActive = (pagePath: string): boolean => {
    return pagePath === pathname;
  }


  return (
    <div className={styles.root}>

      <aside className={styles.sidebar} style={{ width: menuOpen ? "200px" : "60px" }}>
        <div className={styles.hamburger} role="button" onClick={() => setMenuOpen(!menuOpen)}>
          {[...Array(3)].map((_, index: number) => (
            <span className={menuOpen ? styles.menuCloseArrow : styles.menuOpenArrow} key={index}></span>
          ))}
        </div>
        {navigations.map((navigation) => (
          <Link href={navigation.path} key={navigation.pageName}
              className={styles.flexContainer}
              style={{ background: isPageActive(navigation.path) ? "#1B555A" : "none" }}
              >
              { navigation.icon }
              { menuOpen && <p className={styles.pageName}>{ navigation.pageName }</p> }
          </Link>
        ))}
      </aside>

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  )
})