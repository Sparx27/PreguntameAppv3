import { navegar } from "./navegar"


function Link({ to, target, ...props }) {
  function manejarLink(e) {
    const esSelf = target == undefined || target == "_self"
    const esConKey = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    const esMainClick = e.button == 0

    if (esSelf && !esConKey && esMainClick) {
      e.preventDefault()
      navegar(to)
      window.scrollTo(0, 0)
    }
  }

  return <a onClick={manejarLink} href={to} target={target} {...props} />
}

export default Link