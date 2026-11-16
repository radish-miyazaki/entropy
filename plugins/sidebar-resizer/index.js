// 左のサイドバーの「新着」とエクスプローラーの境目に取っ手を置き、ドラッグで高さを変えられるようにする。
// 変えた高さは localStorage に覚えさせ、ページを移っても保つ。ダブルクリックで元に戻す。

const script = `
(() => {
  const KEY = "entropy:recent-notes-height"
  const MIN = 60
  const STEP = 24

  const load = () => {
    try {
      const v = Number(localStorage.getItem(KEY))
      return Number.isFinite(v) && v > 0 ? v : null
    } catch {
      return null
    }
  }
  const save = (v) => {
    try {
      if (v === null) localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, String(Math.round(v)))
    } catch {}
  }

  function setup() {
    if (window.matchMedia("(max-width: 800px)").matches) return
    const sidebar = document.querySelector(".left.sidebar")
    const recent = sidebar?.querySelector(":scope > .recent-notes")
    if (!sidebar || !recent) return

    let handle = sidebar.querySelector(":scope > .entropy-resizer")
    if (!handle) {
      handle = document.createElement("div")
      handle.className = "entropy-resizer"
      handle.setAttribute("role", "separator")
      handle.setAttribute("aria-orientation", "horizontal")
      handle.setAttribute("aria-label", "新着とエクスプローラーの高さを変える")
      handle.title = "ドラッグで高さを変える（ダブルクリックで元に戻す）"
      handle.tabIndex = 0
      recent.after(handle)
    }

    const max = () => Math.max(MIN, sidebar.clientHeight - 220)
    const apply = (h) => {
      if (h === null) {
        recent.style.height = ""
        recent.style.maxHeight = ""
        return
      }
      const v = Math.min(Math.max(h, MIN), max())
      recent.style.height = v + "px"
      recent.style.maxHeight = "none"
      return v
    }
    apply(load())

    if (handle.dataset.bound) return
    handle.dataset.bound = "1"

    let startY = 0
    let startH = 0
    const onMove = (e) => {
      apply(startH + (e.clientY - startY))
    }
    const onUp = (e) => {
      try {
        handle.releasePointerCapture(e.pointerId)
      } catch {}
      handle.classList.remove("is-dragging")
      handle.removeEventListener("pointermove", onMove)
      handle.removeEventListener("pointerup", onUp)
      save(recent.getBoundingClientRect().height)
    }
    handle.addEventListener("pointerdown", (e) => {
      e.preventDefault()
      startY = e.clientY
      startH = recent.getBoundingClientRect().height
      try {
        handle.setPointerCapture(e.pointerId)
      } catch {}
      handle.classList.add("is-dragging")
      handle.addEventListener("pointermove", onMove)
      handle.addEventListener("pointerup", onUp)
    })
    handle.addEventListener("dblclick", () => {
      save(null)
      apply(null)
    })
    handle.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return
      e.preventDefault()
      const cur = recent.getBoundingClientRect().height
      save(apply(cur + (e.key === "ArrowDown" ? STEP : -STEP)))
    })
  }

  // ページを移る前に取っ手を外す。サーバーの HTML にない要素を残すと、micromorph がそれを
  // 次の要素（検索のツールバーやエクスプローラー）に書き換えて使い回し、pointerdown の処理が
  // そこに残る。するとポインタを横取りして、検索欄やエクスプローラーのクリックが効かなくなる
  function teardown() {
    for (const el of document.querySelectorAll(".entropy-resizer")) el.remove()
  }

  document.addEventListener("nav", setup)
  document.addEventListener("prenav", teardown)
})()
`

export const SidebarResizer = () => ({
  name: "SidebarResizer",
  // トランスフォーマーとして読み込ませるための空の処理。スクリプトを差し込むだけで、本文は変えない
  htmlPlugins() {
    return []
  },
  externalResources() {
    return {
      js: [{ loadTime: "afterDOMReady", contentType: "inline", script }],
    }
  },
})

export const manifest = {
  name: "sidebar-resizer",
  displayName: "Sidebar Resizer",
  description: "左のサイドバーの新着とエクスプローラーの境目をドラッグで動かせるようにする",
  version: "1.0.0",
  category: "transformer",
  quartzVersion: ">=5.0.0",
}

export default SidebarResizer
