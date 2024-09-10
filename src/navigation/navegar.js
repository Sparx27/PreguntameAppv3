export const navegar = (href) => {
  window.history.pushState({}, "", href)
  const ePushstate = new Event("pushstate")
  window.dispatchEvent(ePushstate)
}