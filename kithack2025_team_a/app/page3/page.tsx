"use client"
import { Fragment, useEffect, useState } from 'react'

import styles from './Omiso.module.css';

import { Layout } from "../styles/Layout";

import Image from "next/image";
import icon from "../page1/mon.jpg";

export default function Timetable() {

  // 曜日
  const days = ["月", "火", "水", "木", "金", "土"];

  // 時間帯
  const periods = [
    "1時間目（9:00~10:30）",
    "2時間目（10:45~12:15）",
    "3時間目（13:15~14:45）",
    "4時間目（15:00~16:30）",
    "5時間目（16:45~18:15）",
    "6時間目（18:25~19:55）",
  ];

  // 授業のデータ（教室やオンラインかどうかなど）を持っているクラス
  interface ClassCell {
    name: string;
    room: string;
    isOnline: boolean;
  }

  // 時間割の更新
  const [timetable, setTimetable] = useState<(ClassCell | null)[][]>(
    Array(periods.length)
      .fill(null)
      .map(() => Array(days.length).fill(null))
  );

  // モーダル（授業を追加しようとすると出てくるやつ）の状態を管理
  const [isModalOpen, setIsModalOpen] = useState(false);

  // クリックされたマスの位置を保存
  const [currentCell, setCurrentCell] = useState<[number, number] | null>(null);

  // モーダルで、入力できる情報たち
  const [formData, setFormData] = useState({
    name: "",
    room: "",
    isOnline: false,
  });

  // 押されたマスの位置を保存し、モーダルを開く
  const openModal = (row: number, col: number) => {
  setCurrentCell([row, col]);
  const cell = timetable[row][col];
  if (cell) {
    // 情報が入っていたら、情報を引き継いでモーダルを開く
    setFormData(cell);
  } else {
    // 新しく作る時は、情報なし
    setFormData({ name: "", room: "", isOnline: false });
  }
  setIsModalOpen(true);
};

  // 授業の保存
  const saveClass = () => {
    if (!currentCell) return;
    const [row, col] = currentCell;
    const newTable = timetable.map((r, ri) =>
      r.map((c, ci) =>
        ri === row && ci === col ? { ...formData } : c
      )
    );
    setTimetable(newTable);
    setIsModalOpen(false);
    setFormData({ name: "", room: "", isOnline: false });
  };

  // 授業の削除
  const deleteClass = () => {
    if (!currentCell) return;
    const [row, col] = currentCell;
    const newTable = timetable.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? null : c))
    );
    setTimetable(newTable);
    setIsModalOpen(false);
  };

  // オンデマンドの個数
  const numbers = ["1", "2", "3", "4", "5"];

  // オンデマンド授業が持つ情報
  interface OndemandClassCell {
    name: string;
    teacher: string;
  }

  // 時間割の更新（オンデマンド）
  const [ondemandtimetable, setOndemandTimetable] = useState<(OndemandClassCell | null)[]>(
    Array(numbers.length).fill(null)
  );

  // モーダル（授業を追加しようとすると出てくるやつ）の状態を管理（オンデマンド）
  const [isOndemandModalOpen, setIsOndemandModalOpen] = useState(false);

  // クリックされたマスの位置を保存（オンデマンド）
  const [currentOndemandCell, setCurrentOndemandCell] = useState<[number] | null>(null);

  // オンデマンドを追加するときに入れることができる情報
  const [formOndemandData, setFormOndemandData] = useState({
    name: "",
    teacher: "",
  });

  // オンデマンドを追加するときに出てくるモーダル
  const openOndemandModal = (col: number) => {
  setCurrentOndemandCell([col]);
  const cell = ondemandtimetable[col];
  if (cell) {
    // 情報が入っていたら、情報を引き継いでモーダルを開く
    setFormOndemandData(cell);
  } else {
    // 新しく作る時は、情報なし
    setFormOndemandData({ name: "", teacher: ""});
  }
  setIsOndemandModalOpen(true);
};

// 授業を保存（オンデマンド）
const saveOndemandClass = () => {
    if (!currentOndemandCell) return;
    const [col] = currentOndemandCell;
    const newTable = ondemandtimetable.map((r, ri) =>
     ri === col ? { ...formOndemandData } : r
      );
    setOndemandTimetable(newTable);
    setIsOndemandModalOpen(false);
    setFormOndemandData({ name: "", teacher: "" });
  };

  // 授業の削除（オンデマンド）
  const deleteOndemandClass = () => {
    if (!currentOndemandCell) return;
    const [col] = currentOndemandCell;
    const newTable = ondemandtimetable.map((r, ri) =>
     (ri === col ? null : r));
    setOndemandTimetable(newTable);
    setIsOndemandModalOpen(false);
  };

  
  // 画面の表示部分
  return (

    <div style={{ backgroundColor: 'White', minHeight: '100vh' }}>

    <Layout>


    <div className='timetable-container'>
      <h1 className="font-bold text-2xl text-gray-700">時間割表</h1>

      <table className={styles.timetable}>

        <thead>
          <tr>
            <th></th>
            {/* 曜日のヘッダーの表示 */}
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* 時間割のマス目の表示 */}
          {timetable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{periods[rowIndex]}</td>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`${styles.cell} ${cell ? (cell.isOnline ? styles.online : styles.offline) : styles.empty}`}
                  onClick={() => openModal(rowIndex, colIndex)}
                >{/* もし、そのマスに何かしらの情報があれば表示します */}
                  {cell ? (
                    <div>
                      <div className="font-bold">{cell.name}</div>
                      <div className="text-sm">{cell.room}</div>
                      <div className="text-xs">{cell.isOnline ? "オンライン" : "対面"}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>


      {/* モーダルの表示 */}
      {isModalOpen && (
        <div className={styles.modal_backdrop}>
          <div className={styles.modal}>
            <h2>{timetable[currentCell![0]][currentCell![1]] ? "授業を編集" : "授業を追加"}</h2>

            {/* 授業名を入れるテキストボックス */}
            <input
              type="text"
              placeholder="授業名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            {/* 教室名を入れるテキストボックス */}
            <input
              type="text"
              placeholder="教室"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />

            {/* オンラインかどうかを選択するチェックボックス */}
            <label>
              <input
                type="checkbox"
                checked={formData.isOnline}
                onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
              />{" "}
              オンライン授業
            </label>

            {/* ボタン類の配置 */}
            <div className={styles.modal_buttons}>
              <button onClick={() => setIsModalOpen(false)}>キャンセル</button>
              <button onClick={saveClass}>保存</button>
              {timetable[currentCell![0]][currentCell![1]] && (
                <button onClick={deleteClass}>削除</button>
              )}
            </div>

          </div>
        </div>
      )}


      <h1 className="font-bold text-2xl text-gray-700">オンデマンド授業</h1>
        <table className={styles.ondemandtable}>

          <thead>
            <tr>
              {/* ヘッダーの番号を表示 */}
              {numbers.map((number) => (
                <th key={number}>{number}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              {/* オンデマンドの授業を追加するマスを表示 */}
              {ondemandtimetable.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  onClick={() => openOndemandModal(cellIndex)}
                  className={`${styles.ondemandcell} ${cell ? styles.full : styles.empty
                    }`}
                >{/* もし、そのマスに何かしらの情報があれば表示します */}
                  {cell ? (
                    <div>
                      <div className="font-bold">{cell.name}</div>
                      <div className="text-sm">{cell.teacher}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          </tbody>

        </table>

        
        {/* オンデマンド授業のモーダル表示 */}
        {isOndemandModalOpen && (
        <div className={styles.modal_backdrop}>
          <div className={styles.modal}>
            <h2>{ondemandtimetable[currentOndemandCell![0]] ? "授業を編集" : "授業を追加"}</h2>

            {/* 授業名を追加するテキストボックス */}
            <input
              type="text"
              placeholder="授業名"
              value={formOndemandData.name}
              onChange={(e) => setFormOndemandData({ ...formOndemandData, name: e.target.value })}
            />

            {/* 先生の名前を入れるテキストボックス */}
            <input
              type="text"
              placeholder="先生"
              value={formOndemandData.teacher}
              onChange={(e) => setFormOndemandData({ ...formOndemandData, teacher: e.target.value })}
            />

            {/* ボタン類の配置 */}
            <div className={styles.modal_buttons}>
              <button onClick={() => setIsOndemandModalOpen(false)}>キャンセル</button>
              <button onClick={saveOndemandClass}>保存</button>
              {ondemandtimetable[currentOndemandCell![0]] && (
                <button onClick={deleteOndemandClass}>削除</button>
              )}
            </div>

          </div>
        </div>
      )}
      
    </div>

      

    </Layout>
    
    </div>
  );
}