function isHome() {
  if (
    window.document.location.href != "http://localhost:4000/" &&
    window.document.location.href != "http://cloudchewie.com/" &&
    window.document.location.href != "http://www.cloudchewie.com" &&
    window.document.location.href != "http://github.cloudchewie.com" &&
    window.document.location.href != "https://localhost:4000/" &&
    window.document.location.href != "https://cloudchewie.com/" &&
    window.document.location.href != "https://www.cloudchewie.com" &&
    window.document.location.href != "https://github.cloudchewie.com"
  )
    return false;
  return true;
}
