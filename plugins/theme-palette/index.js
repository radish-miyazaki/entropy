// サイトの配色（テーマ）を選べるようにする。
// 選んだテーマは <html data-palette="..."> に入れ、色は quartz/styles/custom.scss の $palettes で定義する。
// ライトとダークの切り替えは今までどおり Quartz の darkmode が受け持ち、テーマはその両方の色を持つ。

const PALETTES = [
  ["entropy", "Entropy"],
  ["catppuccin", "Catppuccin"],
  ["tokyonight", "Tokyo Night"],
  ["gruvbox", "Gruvbox"],
]
const KEY = "entropy:palette"

// 描画の前に当てて、ページを開いた瞬間に既定の色がちらつかないようにする
const before = `
(() => {
  try {
    const p = localStorage.getItem(${JSON.stringify(KEY)})
    if (p && p !== "entropy") document.documentElement.setAttribute("data-palette", p)
  } catch {}
})()
`

const after = `
(() => {
  const KEY = ${JSON.stringify(KEY)}
  const PALETTES = ${JSON.stringify(PALETTES)}

  const current = () => document.documentElement.getAttribute("data-palette") ?? "entropy"
  const apply = (p) => {
    if (p === "entropy") document.documentElement.removeAttribute("data-palette")
    else document.documentElement.setAttribute("data-palette", p)
    try {
      localStorage.setItem(KEY, p)
    } catch {}
    // グラフなどは themechange で色を読み直す
    const theme = document.documentElement.getAttribute("saved-theme") ?? "light"
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }))
  }

  const makeRow = (extraClass) => {
    const row = document.createElement("div")
    row.className = "entropy-palette-row " + extraClass
    const label = document.createElement("label")
    label.textContent = "テーマ"
    const select = document.createElement("select")
    select.className = "entropy-palette"
    for (const [value, text] of PALETTES) {
      const opt = document.createElement("option")
      opt.value = value
      opt.textContent = text
      select.append(opt)
    }
    select.value = current()
    select.addEventListener("change", () => {
      apply(select.value)
      for (const s of document.querySelectorAll(".entropy-palette")) s.value = select.value
    })
    label.append(select)
    row.append(label)
    return row
  }

  function setup() {
    // パソコン: 左のサイドバーのツールバー（検索とダークモード）の下に、独立した行として置く
    const toolbar = document.querySelector(".left.sidebar .darkmode")?.closest(".left.sidebar > *")
    if (toolbar && !toolbar.parentElement.querySelector(":scope > .entropy-palette-row")) {
      toolbar.after(makeRow("is-sidebar"))
    }
    // スマホ: サイドバーはヘッダの横並びになるので、フッタに置く
    const footer = document.querySelector("footer")
    if (footer && !footer.querySelector(".entropy-palette-row")) {
      footer.append(makeRow("is-footer"))
    }
    for (const s of document.querySelectorAll(".entropy-palette")) s.value = current()
  }

  document.addEventListener("nav", setup)
})()
`

export const ThemePalette = () => ({
  name: "ThemePalette",
  // トランスフォーマーとして読み込ませるための空の処理。スクリプトを差し込むだけで、本文は変えない
  htmlPlugins() {
    return []
  },
  externalResources() {
    return {
      js: [
        { loadTime: "beforeDOMReady", contentType: "inline", script: before },
        { loadTime: "afterDOMReady", contentType: "inline", script: after },
      ],
    }
  },
})

export const manifest = {
  name: "theme-palette",
  displayName: "Theme Palette",
  description: "サイトの配色を Entropy・Catppuccin・Tokyo Night・Gruvbox から選べるようにする",
  version: "1.0.0",
  category: "transformer",
  quartzVersion: ">=5.0.0",
}

export default ThemePalette
