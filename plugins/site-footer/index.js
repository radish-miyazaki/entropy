// @quartz-community/footer の代わりに、ページの下に出す表示。
// 本家は「{createdWith} Quartz vX © 年」の順に組み立てるので、日本語だと「作成 Quartz v5.1.0 © 2026」になり、
// © が誰のものかも読み取れない。ここでは「© 年 著者 · Created with Quartz」と、リンクの並びを出す。

import { jsx, jsxs } from "preact/jsx-runtime"

const css = `
footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}
footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: -1rem;
}
`

export const SiteFooter = (opts) => {
  const author = opts?.author ?? ""
  const links = opts?.links ?? {}

  const Footer = ({ displayClass }) => {
    const year = new Date().getFullYear()
    return jsxs("footer", {
      class: displayClass ?? "",
      children: [
        jsxs("p", {
          children: [
            `© ${year}${author ? ` ${author}` : ""} · Created with `,
            jsx("a", { href: "https://quartz.jzhao.xyz/", children: "Quartz" }),
          ],
        }),
        jsx("ul", {
          children: Object.entries(links).map(([text, href]) =>
            jsx("li", { children: jsx("a", { href, children: text }) }),
          ),
        }),
      ],
    })
  }
  Footer.css = css
  return Footer
}
