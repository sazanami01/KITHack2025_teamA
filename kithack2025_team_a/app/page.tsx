// "use client" は、このコンポーネントがクライアントサイドでレンダリングおよび実行されることを示すNext.jsのディレクティブです。
// これにより、useStateやuseEffectなどのReactフックを使用できます。
"use client"

// 必要なライブラリやコンポーネントをインポートします。
import FullCalendar from '@fullcalendar/react' // FullCalendarのメインコンポーネント
import dayGridPlugin from '@fullcalendar/daygrid' // 月表示用のプラグイン
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction' // ドラッグ、ドロップ、クリックなどの操作を可能にするプラグイン
import timeGridPlugin from '@fullcalendar/timegrid' // 週・日表示用のプラグイン
import { Fragment, useEffect, useState } from 'react' // Reactの基本的なフック
import { Dialog, Transition } from '@headlessui/react' // UIライブラリHeadless UIからモーダル用のコンポーネントをインポート
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid' // アイコンライブラリHeroiconsからアイコンをインポート
import { EventSourceInput } from '@fullcalendar/core/index.js' // FullCalendarのイベントソースの型定義


// カレンダーに表示するイベントのデータ構造を定義するインターフェース（型定義）
interface Event {
  title: string;       // イベントのタイトル
  start: Date | string; // イベントの開始日時
  allDay: boolean;     // 終日イベントかどうか
  id: number;          // イベントの一意なID
}

// Homeコンポーネント：アプリケーションのメインとなる部分
export default function Home() {
  // --- State（状態）の定義 ---
  // useStateフックを使って、コンポーネントが持つ状態を管理します。

  // ドラッグ可能な外部イベントのリスト
  const [events, setEvents] = useState([
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    { title: 'event 3', id: '3' },
    { title: 'event 4', id: '4' },
    { title: 'event 5', id: '5' },
  ])
  // カレンダー上に表示されるすべてのイベントのリスト
  const [allEvents, setAllEvents] = useState<Event[]>([])
  // イベント追加用モーダルの表示・非表示を管理する状態
  const [showModal, setShowModal] = useState(false)
  // イベント削除確認用モーダルの表示・非表示を管理する状態
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // 削除対象となるイベントのIDを一時的に保持する状態
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  // 新規作成中のイベント情報を保持する状態
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: false,
    id: 0
  })

  // useEffectフック：コンポーネントがマウント（初回表示）された後に一度だけ実行される処理
  useEffect(() => {
    // 'draggable-el'というIDを持つDOM要素を取得
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      // Draggableクラスのインスタンスを作成し、ドラッグ機能を有効にする
      new Draggable(draggableEl, {
        // ドラッグ対象となる要素をCSSセレクタで指定
        itemSelector: ".fc-event",
        // ドラッグされた要素からカレンダー用のイベントデータを生成する関数
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title")
          let id = eventEl.getAttribute("data")
      let start = eventEl.getAttribute("start")
          return { title, id, start }
        }
      })
    }
  }, []) // 第2引数の配列が空なので、この副作用はマウント時に1回だけ実行されます

  /**
   * カレンダーの日付がクリックされたときに呼び出される関数
   * @param arg - クリックされた日付の情報を含むオブジェクト
   */
  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    // 新規イベントの状態を更新（開始日、終日フラグ、ユニークIDを設定）
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    // イベント追加用モーダルを表示
    setShowModal(true)
  }

  /**
   * 外部イベントがカレンダーにドロップされたときに呼び出される関数
   * @param data - ドロップイベントの情報を含むオブジェクト
   */
  function addEvent(data: DropArg) {
    // 新しいイベントオブジェクトを作成
    const event = { 
      ...newEvent, 
      start: data.date.toISOString(), // ドロップされた日付をISO文字列形式で設定
      title: data.draggedEl.innerText, // ドラッグされた要素のテキストをタイトルに設定
      allDay: data.allDay, 
      id: new Date().getTime() // ユニークなIDとして現在時刻のタイムスタンプを使用
    }
    // allEvents stateに新しいイベントを追加
    setAllEvents([...allEvents, event])
  }

  /**
   * カレンダー上のイベントがクリックされたときに呼び出される関数
   * @param data - クリックされたイベントの情報を含むオブジェクト
   */
  function handleDeleteModal(data: { event: { id: string } }) {
    // 削除確認モーダルを表示
    setShowDeleteModal(true)
    // 削除対象のイベントIDをstateに保存
    setIdToDelete(Number(data.event.id))
  }

  /**
   * 削除確認モーダルで「Delete」ボタンが押されたときに呼び出される関数
   */
  function handleDelete() {
    // allEvents配列から、idToDeleteと一致しないイベントのみをフィルタリングして新しい配列を作成
    setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
    // 削除確認モーダルを閉じる
    setShowDeleteModal(false)
    // 削除対象IDをリセット
    setIdToDelete(null)
  }

  /**
   * いずれかのモーダルが閉じられたときに呼び出される関数
   */
  function handleCloseModal() {
    // イベント追加モーダルを閉じる
    setShowModal(false)
    // 新規イベントの状態を初期化
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })
    // 削除確認モーダルを閉じる
    setShowDeleteModal(false)
    // 削除対象IDをリセット
    setIdToDelete(null)
  }

  /**
   * イベント追加モーダルの入力フィールドの値が変更されたときに呼び出される関数
   * @param e - input要素の変更イベントオブジェクト
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // 入力された値でnewEventのtitleを更新
    setNewEvent({
      ...newEvent,
      title: e.target.value
    })
  }

  /**
   * イベント追加フォームが送信されたときに呼び出される関数
   * @param e - フォームの送信イベントオブジェクト
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() // フォームのデフォルトの送信動作（ページリロード）を防ぐ
    // allEvents stateに新しいイベントを追加
    setAllEvents([...allEvents, newEvent])
    // イベント追加モーダルを閉じる
    setShowModal(false)
    // 新規イベントの状態を初期化
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })
  }

  // --- JSXによるレンダリング ---
  return (
    <>
      {/* ナビゲーションバー */}
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      {/* メインコンテンツ */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          {/* カレンダー表示エリア */}
          <div className="col-span-8">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev,next today', // 左側に「前へ」「次へ」「今日」ボタン
                center: 'title',          // 中央にタイトル（例: "2025年9月"）
                right: 'dayGridMonth,timeGridWeek' // 右側に「月」「週」表示切り替えボタン（`resourceTimelineWook`は存在しないビューなので、`dayGridMonth,timeGridWeek`に修正するのが一般的です）
              }}
              events={allEvents as EventSourceInput} // カレンダーに表示するイベントのデータ
              nowIndicator={true}   // 現在時刻のインジケーターを表示
              editable={true}       // イベントのドラッグによる移動やリサイズを許可
              droppable={true}      // 外部からのイベントドロップを許可
              selectable={true}     // 日付範囲の選択を許可
              selectMirror={true}   // 日付範囲選択中にプレースホルダーを表示
              dateClick={handleDateClick} // 日付クリック時のイベントハンドラ
              drop={(data) => addEvent(data)} // イベントドロップ時のイベントハンドラ
              eventClick={(data) => handleDeleteModal(data)} // イベントクリック時のイベントハンドラ
            />
          </div>
          {/* ドラッグ可能なイベントリスト */}
          <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
            <h1 className="font-bold text-lg text-center">Drag Event</h1>
            {/* events stateをループして、ドラッグ可能なdiv要素を生成 */}
            {events.map(event => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={event.title}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>

        {/* --- 削除確認モーダル (Headless UI) --- */}
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
            {/* モーダルの背景オーバーレイ */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* モーダル本体 */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* モーダルのフッターボタン */}
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDelete}>
                        Delete
                      </button>
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* --- イベント追加モーダル (Headless UI) --- */}
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add Event
                        </Dialog.Title>
                        {/* イベント追加フォーム */}
                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="mt-2">
                            {/* イベントタイトル入力欄 */}
                            <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6"
                              value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                          </div>
                          {/* フォームのボタン */}
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                              disabled={newEvent.title === ''} // タイトルが空の場合はボタンを無効化
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main >
    </>
  )
}