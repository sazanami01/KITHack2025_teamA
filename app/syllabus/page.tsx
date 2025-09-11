// syllabus/page.tsx
"use client";

import { pages } from "./styles";
import * as React from 'react';
import { 
  Fragment,
  useEffect,
  useState
} from 'react'
/*import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';*/
import Box from '@mui/material/Box';
import { Home } from "./page.tsx";


import { Suspense } from 'react';
import { SearchResultList } from './SearchResultList';
import { Loader } from './Loader';
import { Center } from '@mantine/core';
import { useSearchParams } from "next/navigation";

//export default function MenuAppBar() {
  
  /*　AppBarの設定
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };*/


  // シラバスの表示についての設定

  interface PageProps {
    searchParams: {
        q?: string
    }
  }

  //const [query, setQuery] = useState("");

export default function ArtSearchPage() {
 //　水和エラーが出るからuseSearchParamsを使う
const searchParams = useSearchParams(); // URLのクエリパラメータを取得するフック
  const query = searchParams.get('q') ?? ""; // qがnullのときは空文字にする
  

  return (
    /* AppBarの表示の設定(却下) 
        <>
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Simple Syllabus!!!
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    */
     /* ここから下が検索結果の表示部分 */
      <Box my="md">
        {query.length >= 1
          ? <Suspense key={query} fallback={ // queryが変わるたびにSuspenseをリセットする
            // Suspenseは、非同期処理の完了を待つためのコンポーネント
            // ローディング中に表示するコンポーネント
          <Center>
            <Loader />
          </Center>
        } >
        <SearchResultList query={query} /> 
          </Suspense>
          // queryが空のときに表示するコンポーネント
          : <div>近大シラバスへようこそ!!!
            <br /> 
            上の検索バーで授業名で検索してみよう！(Enterを押してね...)
            <br />
          </div>
        }
      </Box>
    );
  };
